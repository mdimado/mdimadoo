---
title: 'The Linux Foundation called.'
date: '2025-10-15'
excerpt: 'another one'
---

Okay so, GSoC wasn't enough apparently. 😭

A few months after getting selected for GSoC under OpenPrinting (The Linux Foundation), I somehow ended up doing *another* Linux Foundation internship. This one with O-RAN-SC. And no, I did not plan for any of this. It just... happened.

Let me start from the beginning.
<br/>
<h2>What even is O-RAN-SC?</h2>

<a href="https://o-ran-sc.org/">O-RAN-SC</a> (O-RAN Software Community) is an open-source project under the Linux Foundation focused on building software for Open Radio Access Networks. Think of it as the software layer that makes modern, open, and disaggregated mobile networks actually work. The piece I ended up working with is called the **Near-RT RIC** (Near Real-Time RAN Intelligent Controller), which is essentially a platform that hosts small applications called xApps to monitor and optimize the network in near real-time.

I had zero background in telecom before this. Genuinely zero.
<br/>
<h2>How did it start?</h2>

Around August 2025, I came across an internship opportunity with O-RAN-SC and applied. Got an email from Sridhar Rao (from the Linux Foundation) saying they received ~75 applications and shortlisted ~25 for a hands-on task. The task was to deploy the Near-RT-RIC platform, an xApp, and optionally an E2 simulator.

The optional one was for bonus points. I did it anyway. 😭

The first problem I ran into was that my PC had Ubuntu 24.04, which the platform straight up didn't support. Got hit with:

```
Unsupported Ubuntu release (24.04) detected. Exit.
```

So I had to downgrade to Ubuntu 20.04, set everything up again, and then actually get the platform running. After getting all pods up, deploying the kpm-basic-xapp (ran into a helm install issue, fixed it using `dms_cli install`), and getting the E2 simulator to connect (had a kubectl connectivity issue because it was pointing to the wrong server IP, took me a bit to debug), I submitted the GitHub repo with all three tasks documented.

Sridhar replied: *"Thanks, Imaduddin. Appreciate it. Will get back to you soon."*

A few days later, a Zoom invite showed up in my inbox. Then a follow-up email with two questions: am I familiar with Kubernetes Operators, and have I worked on CVEs before?

I replied honestly. I knew the concept of K8s operators, and while I hadn't directly fixed a CVE before, my GSoC work on fuzzing was literally about finding vulnerabilities before they become CVEs. That apparently was enough.

On 1st September, he sent a proposal:

> *Task: CVE Management in O-RAN-SC. Duration: 3 Months Part-Time (~20 Hrs/week). Internship: $1500.*

I replied in 8 minutes. 😭
<br/>
<h2>What did I actually do?</h2>

The work was focused on CVE analysis across O-RAN-SC repositories. The first few weeks were mostly about scanning, understanding, and documenting. I automated CVE scanning using **Grype** across the 10 most active repositories and found CVEs in 6 of them. Then came SNYK, which had its own authentication drama that took a couple of weeks to sort out with Sridhar's help.

Once scanning was done, I built a <a href="https://oran-cve-kqs4.vercel.app/">consolidated CVE dashboard</a> using Next.js to make the findings easier to navigate (yes, FSD came in clutch 😭). Shared it with Sridhar and then moved on to actually triaging and fixing CVEs in repositories like **ric-plt-e2mgr**, **ric-plt-e2**, and **ric-app-kpimon-go**, documenting everything in a shared Google Doc with implementation details and prepared commits for PRs.

Some CVEs were straightforward. Others needed structural changes or coordination with module maintainers, the kind of thing you can't just fix with a version bump.
<br/>
<h2>And then he proposed another one.</h2>

Apparently my work was good enough that Sridhar came back with a second proposal before the first one even fully wrapped up. This time:

**Secure Near-RT-RIC.**

The current RIC platform has no Authentication and Authorization implemented between xApps and the RIC platform. Which means it's not compliant with the O-RAN security specs (specifically Chapter 5.1.3 of O-RAN.WG11.TS.SRCS.0-R004-v13.00, if you want the full mouthful). The goal of this next project is to fix that, implementing mutual TLS, OAuth2-based authorization, secure xApp onboarding with PKI-issued identities, data confidentiality, input validation, rate limiting, and a bunch more.

He asked if I was confident implementing Chapter 5.3.1 specifically (A&A between RIC and xApps). I said yes. I meant it, mostly. 😭

I'll probably write a whole separate blog about that one once it's underway.
<br/>
Looking back at where I was in January, writing my first blog questioning whether FSD was dead and whether I was even good enough, and now somehow being in the middle of two Linux Foundation projects back to back, I genuinely don't know how to process it.

I'm not going to pretend I had a master plan. I didn't. I just kept showing up, kept saying yes, and tried not to drop the ball.

*P.S.: The CVE dashboard is live at <a href="https://oran-cve-kqs4.vercel.app/">oran-cve-kqs4.vercel.app</a> if you want to poke around.*
