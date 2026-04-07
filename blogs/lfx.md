---
title: 'The Linux Foundation, again.'
date: '2025-10-15'
excerpt: ''
---

Okay so, GSoC wasn't enough apparently. 😭

For context, I've been wanting to do an <a href="https://mentorship.lfx.linuxfoundation.org/">LFX Mentorship</a> for a while now. It's The Linux Foundation's mentorship program, kind of like GSoC but runs across different terms throughout the year. I had applied to a bunch of programs across multiple terms and kept getting declined. Meshery, KubeStellar, OpenKruise, KubeEdge, Karmada, Kmesh, liboqs... the list of rejections is honestly embarrassing. 😭

The ones I had the highest hopes for were the CNCF ones, specifically the Karmada and Kmesh programs in Term 3. Both declined. Classic.

The one I didn't expect much from? **O-RAN-SC Code Quality Improvement.** And that's the one that came through.
<br/>
<h2>What even is O-RAN-SC?</h2>

<a href="https://o-ran-sc.org/">O-RAN-SC</a> (O-RAN Software Community) is an open-source project under the Linux Foundation focused on building software for Open Radio Access Networks. The piece I ended up working with is called the **Near-RT RIC** (Near Real-Time RAN Intelligent Controller), a platform that hosts small applications called xApps to monitor and optimize the network in near real-time.

I had zero background in telecom before this. Genuinely zero.
<br/>
<h2>The hands-on task</h2>

The program had ~275 applicants. They shortlisted ~55 for a hands-on task before making selections. The task was to deploy the Near-RT-RIC platform, an xApp, and optionally an E2 simulator.

The optional one was for bonus points. I did it anyway.

My PC had Ubuntu 24.04, which the platform didn't support. Got hit with:

<code>Unsupported Ubuntu release (24.04) detected. Exit.</code>

Had to downgrade to Ubuntu 20.04, set everything up again, and get the platform running. Then deployed the kpm-basic-xapp (ran into a helm install error, fixed it with `dms_cli install`), and got the E2 simulator connected after debugging a kubectl connectivity issue where it was pointing to the wrong server IP.

Submitted the <a href="https://github.com/mdimado/O-RAN-SC-Internship-Tasks">GitHub repo</a> with all three tasks documented and went to sleep.

On 2nd September, this landed in my inbox:

<i>"Hi Mohammed Imaduddin! Congratulations! We are pleased to let you know that you have been accepted as a mentee to the O-RAN-SC Code Quality Improvement mentorship."</i>

Not gonna lie, did not see that one coming.
<br/>
<h2>What the actual work looked like</h2>

The mentorship was focused on CVE analysis and code quality across O-RAN-SC repositories. The first few weeks were about scanning and documenting. I automated CVE scanning using **Grype** across the most active repositories, found CVEs in 6 of 10, and started documenting everything.

Then came SNYK, which had its own authentication drama that took a couple of weeks to sort out with Sridhar's help. Once that was done, I built a <a href="https://oran-cve-kqs4.vercel.app/">consolidated CVE dashboard</a> in Next.js to make the findings actually navigable (yes, FSD came in clutch 😭). The later weeks shifted to actually triaging and fixing CVEs in repositories like **ric-plt-e2mgr**, **ric-plt-e2**, and **ric-app-kpimon-go**, with commits prepared for PRs.

Some CVEs were straightforward. Others needed structural changes or coordination with module maintainers, the kind of thing you can't just fix with a version bump.
<br/>
<h2>And then he proposed another one.</h2>

Apparently Sridhar found the work good enough to come back with a second proposal before the first one wrapped up. **Secure Near-RT-RIC.** The current RIC platform has no Authentication and Authorization implemented between xApps and the platform, which means it's not compliant with O-RAN security specs. The goal of this next one is to fix that - mutual TLS, OAuth2-based authorization, secure xApp onboarding, data confidentiality, input validation, rate limiting, the works.

He asked if I was confident implementing Chapter 5.3.1 (A&A between RIC and xApps). I said yes. I meant it, mostly. 😭

I'll probably write a separate blog about that once it's properly underway.
<br/>
Looking back at the list of declined applications, it's kind of funny how it worked out. I was most hopeful about the CNCF ones, applied to like 10 programs across multiple terms, and the one that finally said yes was the one I least expected.

Ig that's just how it goes.
