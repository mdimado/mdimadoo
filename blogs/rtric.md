---
title: 'Making xApps actually secure.'
date: '2026-04-07'
excerpt: 'auth, certs, mTLS, and a lot of debugging'
---

After the LFX mentorship, Sridhar came back with another proposal. This time, it wasn't about CVEs or code quality. It was about actually building something. Implementing Authentication and Authorization for the Near-RT RIC platform, which, as I mentioned in the last blog, currently has none.

Zero. An xApp can just... talk to the platform. No questions asked.

That's what I had to fix.
<br/>
<h2>The problem, in plain terms</h2>

The O-RAN security spec (Chapter 5.3.1, if you want to look it up) says there should be mutual authentication and authorization between xApps and the RIC platform. The current AppMgr, which is the component that manages xApp registration and lifecycle, has no such thing. Any xApp can register with it. There's no identity verification, no certificates, nothing.

My job was to implement the full secure registration flow. This meant:
<ul>
  <li>A new registration endpoint in AppMgr where xApps submit a CSR and get back a signed certificate and a UUID</li>
  <li>Integrating a CA (Smallstep) to actually sign those certificates</li>
  <li>Integrating Keycloak for bootstrap token validation so only legitimate xApps can even reach the endpoint</li>
  <li>Setting up an mTLS gateway via Envoy so that all platform communication requires a valid client certificate</li>
</ul>

I had never worked with any of this before. Not x509 certificates, not Smallstep, not Keycloak, not Envoy. So the learning curve was... steep. 😭
<br/>
<h2>Step 1: the new endpoint</h2>

The first thing I did was extend the AppMgr API spec to add a new endpoint: <code>POST /ric/v1/xapps/register-cert</code>. This is where an xApp sends its CSR (Certificate Signing Request) along with a Keycloak JWT bootstrap token, its app name, and its instance name. In return, it gets a UUID and a signed X.509 certificate.

Adding the endpoint to the OpenAPI spec was straightforward enough. The annoying part was figuring out how AppMgr's code generation works. The repo doesn't commit generated swagger code. <code>pkg/restapi</code> and <code>pkg/models</code> are generated at build time. I had to download go-swagger v0.19.0 (matching the version in the Dockerfile) and run the correct generation command. I ran the wrong one at some point and spent a day recovering from the broken state it left the codebase in. 😭

Once the generated code was correct, I wired in the new handler, built the identity structs, and set up SDL persistence (Redis) for storing identity records. I modeled it after the existing subscription storage logic in the repo so it follows the same patterns. Identities survive server restarts, they reload from Redis on startup.
<br/>
<h2>Step 2: CSR parsing and PoP verification</h2>

For the xApp to prove it actually owns the private key it claims to have, it submits a CSR (Certificate Signing Request), which is a standard way of saying "here's my public key, signed by my own private key, please issue me a certificate." AppMgr needs to parse this CSR and verify that self-signature.

I created a <code>certauth</code> package with helpers for:
<ul>
  <li><code>ParseCSR()</code> — decodes the PEM block, parses the x509 certificate request, and verifies the CSR self-signature</li>
  <li><code>GenerateNonce()</code> and <code>VerifySignature()</code> — supporting both RSA PKCS1v15 and ECDSA ASN1 signature schemes</li>
</ul>

The full Proof-of-Possession nonce challenge flow (where the server sends a nonce and the xApp has to sign it to prove ownership) isn't wired in yet. That's still on the list.
<br/>
<h2>Step 3: Smallstep CA integration</h2>

Once AppMgr has verified the CSR, it needs to get it signed by an actual Certificate Authority. I integrated <a href="https://smallstep.com/">Smallstep CA</a> for this.

The way it works: AppMgr forwards the CSR to Smallstep at <code>POST /1.0/sign</code> along with a provisioner JWT token. Smallstep verifies the token, signs the CSR with its intermediate CA key, and returns a signed X.509 certificate.

The problem with provisioner tokens is that they expire in 5 minutes. Manually pasting them was obviously not going to work. So I implemented automatic token generation inside the CA client: AppMgr decrypts the encrypted JWK provisioner key at request time (password from environment variables), signs a fresh JWT with the correct claims, and submits it to Smallstep. The whole thing is automatic, no manual token management.
<br/>
<h2>Step 4: Keycloak for bootstrap token validation</h2>

Before AppMgr even looks at the CSR, it validates the bootstrap token the xApp sends. The xApp has to authenticate to Keycloak using its pre-assigned client credentials (client_id and client_secret) and get a short-lived JWT. This JWT proves the xApp is a legitimate registered client.

AppMgr fetches Keycloak's public keys (JWKS endpoint) and validates the JWT signature and expiry on every registration request. Invalid or expired tokens return HTTP 401. Valid ones proceed.

I used the <a href="https://github.com/MicahParks/keyfunc">MicahParks keyfunc library</a> for the JWKS fetching and validation, wired it into the handler, and added fallback logic so the validator is skipped with a warning if Keycloak isn't configured. Useful for local development without the full stack running.

After all of this was working end to end, I ran a full test with Redis, Keycloak, Smallstep CA, and AppMgr all running together. The full flow:

<ol>
  <li>xApp generates a private key and CSR</li>
  <li>xApp authenticates to Keycloak and gets a JWT</li>
  <li>xApp calls <code>POST /ric/v1/xapps/register-cert</code> with the CSR + JWT</li>
  <li>AppMgr validates the JWT via JWKS</li>
  <li>AppMgr parses the CSR and verifies the self-signature</li>
  <li>AppMgr assigns a UUID v4 as the permanent identity</li>
  <li>AppMgr generates a fresh provisioner token, forwards CSR to Smallstep</li>
  <li>Smallstep returns a signed X.509 certificate</li>
  <li>AppMgr stores the identity record in Redis and in-memory</li>
  <li>AppMgr returns the UUID, signed cert, and expiry to the xApp</li>
</ol>

HTTP 201. First time it worked end to end, I genuinely just sat there for a second. 😭
<br/>
<h2>Step 5: mTLS via Envoy</h2>

Having a signed certificate is great, but the platform also needs to *enforce* that xApps present it. That's where Envoy comes in as an mTLS gateway sidecar.

This part was the most painful.

I set up a local kind cluster, deployed Redis, built and loaded the AppMgr Docker image, and created configmaps for the Smallstep root CA and Envoy config. Then deployed AppMgr with Envoy as a sidecar and hit an immediate wall: all connections were being rejected even with valid client certificates.

Two problems:

**Problem 1:** Certificate files mounted from Kubernetes secrets had root-only permissions (<code>0600</code>), but AppMgr runs as UID 1000. It couldn't read them. Fixed with an init container that copies and chmods the cert files before AppMgr starts.

**Problem 2:** Envoy v1.28 had a breaking change in how TLS is specified under <code>DownstreamTlsContext</code>. Downgraded to Envoy v1.25. That introduced xDS API version issues. Switched from dynamic xDS config to static configuration.

After both fixes: mTLS worked. Valid client certificates accepted. Requests without certificates rejected at the TLS handshake. Certificates signed by a wrong CA rejected. Built and pushed the new AppMgr image to <a href="https://hub.docker.com/r/mdimado/ric-plt-appmgr">Docker Hub</a>.
<br/>
<h2>What's still left</h2>

Certificate rotation and revocation. That's the one piece that's genuinely complicated and I haven't gotten into yet. The full PoP nonce challenge flow also needs to be wired in properly. And ideally, there should be an actual test xApp that goes through the whole registration flow end to end on the lab server. I've documented what that xApp would need to do, but haven't built it yet.

The next step that makes the most sense is designing either a new xApp from scratch or modifying an existing one to use the <code>register-cert</code> endpoint.
<br/>
I started this knowing nothing about x509 certificates, Keycloak, Smallstep, or Envoy. Four months later I have a working secure registration flow and an mTLS gateway running in a kind cluster. I'll take that.

*P.S.: The AppMgr image with all the secure registration changes is at <a href="https://hub.docker.com/r/mdimado/ric-plt-appmgr">docker.io/mdimado/ric-plt-appmgr:secure-reg</a> if you want to poke at it.*