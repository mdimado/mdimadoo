---
title: 'The Canonical rabbit hole.'
date: '2025-04-29'
excerpt: 'written interviews, psychometric tests, and a very long process'
---

So I've been applying to Canonical. A lot. And I think it deserves its own blog because the process is genuinely unlike anything else I've gone through.

For context, <a href="https://canonical.com">Canonical</a> is the company behind Ubuntu. If you've used Linux, you've probably used something they built. They're fully remote, distributed across every timezone, and they take hiring extremely seriously. Like, uncomfortably seriously. 😭
<br/>
<h2>How it started</h2>

My first application was in June 2025, for the Community Engineer role. Got moved forward, received the written interview, and then... my semester exams happened. I didn't submit in time. They closed the application. That was entirely on me.

Applied again in November 2025, this time for Distributed Systems Testing Software Engineer (Python/Go). Same thing. Written interview sent, I submitted it late (exams again 😭), they closed it, I emailed Thorsten explaining the situation, he reopened it. I submitted. Got rejected a week later.

Meanwhile I also applied to Embedded Linux Consultant - Japan. Rejected within 3 days. That one I probably should not have applied to.

Then Security Software Engineer. Rejected on resume screening. Graduate Software Engineer. Also rejected on resume screening. At this point the Canonical folder in my Gmail was getting embarrassing. 😭
<br/>
<h2>What the process actually looks like</h2>

Every Canonical application goes through roughly the same stages:

<ol>
  <li>Resume screening</li>
  <li>Written interview + psychometric assessment (GIA)</li>
  <li>Take-home technical assessment</li>
  <li>Technical interviews (usually 2-3)</li>
  <li>Talent interview (HR, compensation, logistics)</li>
  <li>Hiring manager + VP interviews</li>
  <li>Offer</li>
</ol>

The written interview is the thing that makes Canonical different from everyone else. It's a long document with questions across four broad areas: engineering experience, education (yes, they ask about your high school grades 😭), context (how you see Canonical and its mission), and role-specific questions. You submit it as an anonymous PDF. Multiple reviewers grade it independently to reduce bias.

They are also very upfront about one thing: if they detect AI in your answers, your application is over. Not just for this role. For any role at Canonical. They mean it.

The GIA is a psychometric assessment from Thomas International that measures reasoning, perceptual speed, number speed and accuracy, word meaning, and spatial visualization. It takes about 40-45 minutes. Speed matters as much as accuracy.
<br/>
<h2>Ubuntu Security Engineer</h2>

January 2026, sixth application. This time I submitted the written interview on time. Then the GIA. Then a take-home technical assessment (C code review, security vulnerabilities, about 3 hours). Then three early-stage interviews in one week.

All three passed. Then a Talent interview (HR, CV walkthrough, behavioral assessment). Passed. Then a Hiring Manager interview with Ivan Reedman. Passed. And now I'm waiting for the final stage — interviews with Diogo (my hiring lead) and Pierre Guillemin, the VP of Excellence Engineering.

That's 5 interviews down, 2 more to go. At the time of writing this. 😭

Let me actually break down what happened in each one because I think it's worth documenting.
<br/>
<h2>The interviews</h2>

***General Technical (March 25, with Jorge Sancho)***

Started with the standard "tell me about yourself", walked through my GSoC and O-RAN work. Then it got technical pretty fast. He asked about Rust — I was honest that I'd never used it, said I knew it was designed for speed. He pointed out that memory safety is actually the main value proposition. Fair point, noted.

Package management, .deb files, snaps — I had learned about snaps through Till Kamppeter (who spent 20+ years at Canonical) so I could at least speak to what they are conceptually. No hands-on experience building them though.

He asked me to explain fuzzing to a 10-year-old. I used a Hot Wheels car analogy — keep pushing the car back and forth until one of the tires flattens, which tells you there was a defect. I think that landed okay.

The CVE tooling question was interesting. He asked about the limitations of Snyk and Grype. The main one I talked about was false positives when a package has backported a security patch without bumping the version number, which is common in Ubuntu. The tools flag it as vulnerable because they're comparing version numbers against NVD, but Ubuntu has its own OVAL data structure for tracking patch status that these tools don't account for.

He also asked about responsible disclosure tradeoffs — keeping a vulnerability private gives you time to fix it before attackers know, but there's a window where a sophisticated attacker who independently discovers it could exploit it undetected.

***General Cross-Team (March 26, with Kleber Sacilotto De Souza)***

This one was less deep technically and more about who I am. Open source journey, collaboration experience, leadership, how I got into security. I talked about VP-ing the open source club at college, organizing a hackathon with 1000+ registrations, the whole GSoC application story.

He asked about the DoS CVE fix I worked on at O-RAN. The Nokia-reported vulnerability where external xApps could flood a message routing table. I implemented a fixed window rate limiter at the application level. He seemed satisfied with that.

He also asked how I'd handle a security issue reported by another team — gather as much information as possible from them first (what the issue is, what they've already tried, which components), then bring it internally before acting.

***Technical Exercise Deep Dive (March 26 same day, with Rodrigo Zaiden)***

This was the most technical of the three. They walked through the C code I had submitted in the take-home assessment and asked me to explain my thinking.

I got caught out on a few C-specific things — didn't know `asprintf` off the top of my head (allocates on the heap, unlike `sprintf` which writes to a pre-allocated buffer), wasn't certain about the exact C function for checking symlinks. But I understood the concepts. I identified the O(n²) complexity issue where strlen was being recalculated inside the loop. I identified the symlink attack vector — if a file in the temp folder is a symlink to a file in the passwords folder, writing to the temp file would overwrite the passwords file. I suggested checking if the file already exists before writing.

The fgets buffer overflow question I handled well — it discards input beyond 32 characters, and you'd need to add a check and flush the remaining buffer before prompting the user to re-enter.

The memory leak discussion came up — if heap-allocated memory isn't freed on error paths and the program is internet-exposed, it could cause unnecessary storage consumption over time.

I think I did okay on this one. Not perfect, but I showed I understood what to look for even when I didn't know the exact function name.

***Talent Interview (April 9, with Jovana)***

CV walkthrough, career choices, behavioral assessment results, compensation discussion. Canonical is transparent about how this works — they have a compensation philosophy and they tell you about it, then gather your requirements and pass them to the hiring lead. They don't give you a specific number at this stage.

She also asked about availability to start, location, right-to-work status, that sort of thing.

***Hiring Manager Interview (April 24, with Ivan Reedman)***

This was the most conversational one. Ivan is a senior person, the interview felt less like a test and more like a discussion about where the industry is going.

He asked what companies like Canonical need to do to stay ahead of fast-moving attackers. I said the key is balancing financial investment in security against other business requirements — investing in the right people and tools and building proactive defense systems rather than reactive ones.

He asked about AI in security. I said I use LLMs like Claude Code and Cursor to understand complex codebases faster, but I haven't used agents extensively. I also said AI is a double-edged sword in security — it's being used by both sides.

He asked why Canonical specifically. I talked about Till Kamppeter, how a workshop with him genuinely gave me an appreciation for how Canonical thinks about system design — the depth behind things like Snap that you don't see from the outside. And my open source background made it feel like a natural fit.

At the end he explained the scorecard process — he fills it out after the call covering communication, language, and handling of challenging questions, it goes to Diogo who consolidates everything and moves to offer discussion if everything checks out. He said Diogo moves quickly once that decision is made.

Ivan said I'd done well to reach the 5th round. That felt good to hear. 😭
<br/>
<h2>Where things stand</h2>

Next up: interviews with Diogo himself, and then Pierre Guillemin (VP of Excellence Engineering). Diogo mentioned there's an in-person sprint happening first so everything is paused until May 19th.

So I'm waiting. Again. As always. 😭

If this works out, it'll be the longest and most thorough hiring process I've ever been through. Six applications, ten months, five interviews passed, two more to go.

Fingers crossed. 🤞🏼

*P.S.: One thing I didn't expect — Canonical sends you your psychometric assessment results. I can download my GIA and PPA candidate reports. I don't think I'll share them here but it's a nice touch that they actually give you that feedback.*