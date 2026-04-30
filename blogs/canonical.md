---
title: 'The Canonical rabbit hole.'
date: '2025-04-29'
excerpt: 'written interviews, psychometric tests, and a very long process'
---

So I've been applying to Canonical. A lot. And I think it deserves its own blog because the process is genuinely unlike anything else I've gone through.

For context, <a href="https://canonical.com">Canonical</a> is the company behind Ubuntu. If you've used Linux, you've probably used something they built. They're fully remote, distributed across every timezone, and they take hiring very seriously. Like, uncomfortably seriously. 😭
<br/>
<h2>How it started</h2>

My first application was in June 2025, for the Community Engineer role. Got moved forward, received the written interview, and then my semester exams happened. I didn't submit in time. They closed the application. That was entirely on me.

Applied again in November 2025, this time for Distributed Systems Testing Software Engineer (Python/Go). Same thing. Written interview sent, I submitted it late because of exams again 😭, they closed it, I emailed Thorsten explaining the situation, he reopened it. I submitted. Got rejected a week later.

Meanwhile I also applied to Embedded Linux Consultant, Japan. Rejected within 3 days. That one I probably should not have applied to.

Then Security Software Engineer. Rejected on resume screening. Graduate Software Engineer. Also rejected on resume screening. At this point the Canonical folder in my Gmail was getting embarrassing. 😭
<br/>
<h2>What the process looks like</h2>

Every Canonical application goes through roughly the same stages. Resume screening, then a written interview and psychometric assessment, then a take-home technical assessment, then technical interviews, then a talent interview, then hiring manager and VP interviews, and then an offer.

The written interview is what makes Canonical different from everyone else. It is a long document with questions across four broad areas. Engineering experience, education (yes, they ask about your high school grades 😭), context (how you see Canonical and its mission), and role specific questions. You submit it as an anonymous PDF and multiple reviewers grade it independently to reduce bias.

They are also very upfront about one thing. If they detect AI in your answers, your application is over. Not just for this role but for any role at Canonical. They mean it.

The GIA is a psychometric assessment from Thomas International that measures reasoning, perceptual speed, number speed and accuracy, word meaning, and spatial visualization. It takes about 40 to 45 minutes and speed matters as much as accuracy.
<br/>
<h2>Ubuntu Security Engineer</h2>

January 2026, sixth application. This time I submitted the written interview on time. Then the GIA. Then a take-home technical assessment which was a C code review focused on security vulnerabilities. Then three early stage interviews in one week, all of which I passed. Then a Talent interview. Then a Hiring Manager interview with Ivan Reedman. And now I am waiting for the final stage which is interviews with Diogo (my hiring lead) and Pierre Guillemin, the VP of Excellence Engineering.

That is 5 interviews down and 2 more to go. At the time of writing this. 😭

Let me actually break down what happened in each one because I think it is worth documenting.
<br/>
<h2>The interviews</h2>

***General Technical (March 25, with Jorge Sancho)***

Started with the usual tell me about yourself, walked through my GSoC and O-RAN work. Then it got technical pretty fast. He asked about Rust. I was honest that I had never used it and said I knew it was designed for speed. He pointed out that memory safety is actually the main value proposition. Fair point, noted.

He asked about package management, .deb files, and snaps. I had learned about snaps through Till Kamppeter who spent 20 plus years at Canonical, so I could speak to what they are conceptually. No hands on experience building them though.

He asked me to explain fuzzing to a 10 year old. I used a Hot Wheels car analogy. Keep pushing the car back and forth until one of the tires flattens, which tells you there was a defect. Fuzzing is continuously testing something until it breaks. I think that landed okay.

The CVE tooling question was interesting. He asked about the limitations of Snyk and Grype. The main one I talked about was false positives when a package has backported a security patch without bumping the version number, which is common in Ubuntu. The tools flag it as vulnerable because they compare version numbers against NVD, but Ubuntu has its own OVAL data structure for tracking patch status that these tools do not account for.

He also asked about embargo. Keeping a vulnerability private gives you time to fix it before attackers know, but there is a window where a sophisticated attacker who independently discovers it could exploit it undetected.

***General Cross-Team (March 26, with Kleber Sacilotto De Souza)***

This one was less deep technically and more about who I am. Open source journey, collaboration experience, leadership, how I got into security. I talked about being VP of the open source club at college, organizing a hackathon with 1000 plus registrations, the whole GSoC application story.

He asked about the DoS CVE fix I worked on at O-RAN. The Nokia reported vulnerability where external xApps could flood a message routing table. I implemented a fixed window rate limiter at the application level.

He also asked how I would handle a security issue reported by another team. I said I would gather as much information as possible from them first, what the issue is, what they have already tried, and which components are affected, and then bring it internally before acting.

***Technical Exercise Deep Dive (March 26, with Rodrigo Zaiden)***

This was the most technical of the three. They walked through the C code I had submitted in the take-home assessment and asked me to explain my thinking.

I got caught out on a few C specific things. I did not know asprintf off the top of my head, it allocates on the heap unlike sprintf which writes to a pre-allocated buffer. I was not certain about the exact C function for checking symlinks either. But I understood the concepts.

I identified the O(n²) complexity issue where strlen was being recalculated inside the loop. I identified the symlink attack vector where if a file in the temp folder is a symlink to a file in the passwords folder, writing to the temp file would overwrite the passwords file. I suggested checking if the file already exists before writing.

The fgets buffer question I handled okay. It discards input beyond 32 characters and you would need to flush the remaining buffer before prompting the user again.

The memory leak discussion was about heap allocated memory not being freed on error paths. If the program is internet exposed it could cause unnecessary storage consumption over time.

I think I did okay on this one. Not perfect, but I showed I understood what to look for even when I did not know the exact function name.

***Talent Interview (April 9, with Jovana)***

CV walkthrough, career choices, behavioral assessment results, and compensation discussion. Canonical is transparent about how this works. They explain their compensation philosophy, gather your requirements, and pass them to the hiring lead. They do not give you a specific number at this stage.

***Hiring Manager Interview (April 24, with Ivan Reedman)***

This was the most conversational one. Ivan is a senior person and the interview felt less like a test and more like a discussion about where the industry is going.

He asked what companies like Canonical need to do to stay ahead of fast moving attackers. I said the key is balancing financial investment in security against other business requirements, investing in the right people and tools, and building proactive defense systems rather than reactive ones.

He asked about AI in security. I said I use LLMs like Claude Code and Cursor to understand complex codebases faster but have not used agents extensively. I also said AI is a double edged sword in security because it is being used by both sides.

He asked why Canonical specifically. I talked about Till Kamppeter and how a workshop with him genuinely gave me an appreciation for how Canonical thinks about system design, the depth behind things like Snap that you do not see from the outside. And my open source background made it feel like a natural fit.

At the end he explained the scorecard process. He fills it out after the call covering communication, language, and handling of challenging questions. It goes to Diogo who consolidates everything and moves to an offer discussion if everything checks out. He said I had done well to reach the 5th round. That felt good to hear. 😭
<br/>
<h2>Where things stand</h2>

Next up are interviews with Diogo himself and then Pierre Guillemin. Diogo mentioned there is an in-person sprint happening first so everything is paused until May 19th.

So I am waiting. Again. As always. 😭

If this works out, it will be the longest and most thorough hiring process I have ever been through. Six applications, ten months, five interviews passed, two more to go.

Fingers crossed. 🤞🏼

*P.S.: One thing I did not expect. Canonical sends you your psychometric assessment results. I can download my GIA and PPA candidate reports. I do not think I will share them here but it is a nice touch that they actually give you that feedback.*