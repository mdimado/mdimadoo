---
title: 'It happened.'
date: '2025-09-08'
excerpt: 'fingers finally uncrossed'
---

It happened.

May 8th, 2025. The day I had been waiting for, a little too anxiously if I'm being honest. I kept refreshing my emails like a maniac. And then it showed up. I got selected for Google Summer of Code 2025 under <a href="https://openprinting.github.io/">OpenPrinting</a>, The Linux Foundation.

I don't even know how to describe what I felt in that moment. Relief? Happiness? A little disbelief? Probably all three at once. I documented the whole lead-up to this in my <a href="/blogs/pregsoc.md">previous blog</a> (go read that if you haven't, it'll make this one hit harder), but the short version is: months of searching for the right project, a bunch of dead ends, a lot of self-doubt, and somehow, it worked out.
<br/>
***So what exactly did I get selected for?***

**Integrating OSS-Fuzz for Go-Based and Python-Based OpenPrinting Projects.**

Yeah, I know, that sounds like a mouthful. Let me break it down in a way that actually makes sense.

OpenPrinting is basically the backbone of printing on Linux. They maintain the printer/driver database, CUPS (the thing that lets your Linux machine talk to printers), and a bunch of other critical tools. Now, <a href="https://github.com/google/oss-fuzz">OSS-Fuzz</a> is a Google project that continuously throws random, malformed, and edge-case inputs at software to find bugs and crashes before they turn into actual security problems. The whole point of my project was to take four OpenPrinting projects that had *never* been fuzz-tested before and get them working with OSS-Fuzz.

Those four projects were:
- **<a href="https://github.com/OpenPrinting/goipp">goipp</a>** - a Go library that handles the Internet Printing Protocol
- **<a href="https://github.com/OpenPrinting/ipp-usb">ipp-usb</a>** - a daemon that makes USB printers work as network IPP printers (yes, this is a thing)
- **<a href="https://github.com/OpenPrinting/pyppd">pyppd</a>** - a Python utility for handling printer description files
- **<a href="https://github.com/OpenPrinting/pycups">pycups</a>** - Python bindings for the CUPS API
<br/>
***Why was this actually hard?***

Each of these four projects is written in a different language, has a different build system, and needs a different fuzzing engine. That alone was a lot to wrap my head around. But the part that made it genuinely interesting was ipp-usb. It's a daemon that talks to physical USB printers, which you obviously can't plug into a fuzzing server. So, to fuzz the hardware-dependent parts of the code, I had to help build a virtual IPP-over-USB emulator using USB/IP. Basically, faking a printer in software so the fuzzer could pretend it was plugging things into one. That was probably the most fun I had during the entire project, not gonna lie.

By the end of it, I had written 22 fuzz harnesses across all four projects, each with custom Dockerfiles and build scripts, all integrated into OSS-Fuzz. Every single one of them is now continuously running on Google's infrastructure, throwing inputs at OpenPrinting's code 24/7.
<br/>
***The people behind it***

My mentors throughout this were <a href="https://github.com/tillkamppeter">Till Kamppeter</a> (the head of OpenPrinting, who I had first texted on Telegram back in February), <a href="github.com/iosifache">George-Andrei Iosif</a>, and <a href="https://github.com/fish98">Jiongchi Yu</a>, aka TT Fish, who had done a similar GSoC project in 2024 and guided me through most of the fuzzing-specific stuff. Also, <a href="https://github.com/alexpevzner">Alexander Pevzner</a>, the author of goipp and ipp-usb himself, helped me understand those projects at a level I couldn't have reached on my own.

I owe a lot to all of them. Couldn't have done it without TT Fish especially 😭.
<br/>
Looking back, I started this whole GSoC journey not even knowing what fuzz testing was. I had to learn Go fuzzing, Python fuzzing, OSS-Fuzz's entire infrastructure, Docker, how USB/IP works, IPP protocol basics, and somehow tie it all together into something that actually runs on Google's servers. It's probably the most I've learned in any single stretch of time since I started coding.

If you told me in January, when I was writing my first blog wondering if full-stack was dead and whether I was even good enough, that I'd end up as a GSoC contributor at The Linux Foundation by the end of the year, I probably wouldn't have believed you.

But here we are. 🤞🏼 (the fingers finally uncrossed)

*P.S.: The code coverage numbers will only be measurable after a few more PRs get merged.*