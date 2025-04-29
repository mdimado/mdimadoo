---
title: 'Fingers crossed'
date: '2025-04-28'
excerpt: 'journey that began with curiosity and ambition'
---

Yes, fingers crossed, just 10 more days until the Google Summer of Code selected mentees are announced. 8th of May 2025 can change a lot, either in the better way or the worse way. It's been three months since I wrote my last blog. All these months passed by in understanding a few projects, clearing a bunch of doubts and holding on to a LOT of hope. I just wanted to document the journey so far, the efforts that I've put in, the discussions around it and everything else even before the real journey begins.
<br/>
<h2>How did it start?</h2>
The motivation I got to start working on GSoC came from <a href="https://github.com/omkar-334">Omkar</a>, he contributed to <a href="https://github.com/ioos">IOOS</a> as a GSoC 2024 mentee. (Check out his project <a href="https://summerofcode.withgoogle.com/archive/2024/projects/VxCwfSg0">here</a>). Seeing him, making it happen, made the whole thing real and achievable. 

On 18th August, 2024, after college, I was walking to the bus bay with Omkar, discussing how he started and didn't know much about the project. He had a whole discussion with the mentors to understand the project and was the only one targeting it at that time, there was no competition. That's when I realized that GSoC is not like any other internship with thousands of applicants. Finding a project with no or fewer applicants can actually help you find a way in. Also, you don't need to be a master or expert from day one.

I went home and started searching for organizations that had participated in GSoC 2024. At that point, I wasn't sure about the domain of the project I should search for. I had always been passionate about web dev and had been working on projects involving full stack development and AI right from my first year of college. But I knew for a fact that projects involving fsd would attract a lot of competition. So, I randomly started searching for organizations, some with projects related to FSD and AI, and others in completely different domains like cloud computing, security, and CI/CD.

I found out <a href="https://www.honeynet.org/gsoc/">'The Honeynet Project'</a> organization interesting as it focused on niche topics and also seemed to have fewer participants, but at that point, I didn’t explore it much.

Later, while searching for organizations, I came across <a href="https://gsoc.beagleboard.io/">beagleboard</a> and this organization had just released their GSoC 2025 project list around that time. One project that caught my attention was <a href="https://gsoc.beagleboard.io/ideas/old/bela-applications.html">the Browser-based IDE</a>. It was a frontend-focused project where the goal was to improve the functionality of their browser based IDE. I researched a bit more about the organization, it was focused on embedded systems and hardware programming. I decided to explore it further. I even borrowed a book about ARM programming from my cousin. But, I found it boring and couldn't really connect with it. So, I decided to leave that path and continue my search.

<br/>
<h2>If You Chase Two Rabbits, Both Will Escape</h2>
A few months passed by, and I didn’t actively keep looking for organizations. I started applying for internships. Some people manage to do multiple things at once, but I’m not one of those who can handle two major commitments together. There was a time when I faced several rejections from internship applications, and looking back, I realized it was because I never gave my full attention to any of them. I was always divided between securing an internship and focusing on GSoC.



But later, I decided to stop applying for internships and put all my focus into GSoC. This was sometime around December 2024. (Read more about this in my <a href="/blog/who">first blog</a>)
Ironically, even after that, I found myself splitting focus again while searching for projects, this time between frontend and ML projects. It was like chasing two rabbits all over again. I’m not even sure why I started looking into ML projects when I didn’t feel confident in them to begin with. Thanks to <a href="https://github.com/meghana-0211">Meghna</a>, in a very detailed convo, for explaining me not to overlook what I’m already good at and the intense competition in ML projects and to apply to GSoC projects involving fsd or something that has less competition, especially if I really wanted to learn something new. Those convos genuinely made me realign my focus as well as my approach.
 

<br/>
<h2>The Hunt Continues</h2>
Around December, organizations had started releasing their GSoC 2025 project ideas. I used to search using Google’s search tools, typing in "GSoC 2025", but only a handful of organizations had made their GSoC 2025 ideas public at that time. 

I discovered <a href="https://www.jenkins.io/projects/gsoc/2025/project-ideas/revamping-jenkins-io-website-success-stories-feature/">another interesting project in the jenkins organization</a> and that was a UI/UX project with the goal of revamping the "Success Stories" page on the Jenkins site. I  set up their website locally and made a few UI tweaks. Another goal of this project was to switch from Jenkinsfile to GitHub Actions for CI/CD, which I wasn’t sure about. So, I started learning github actions (Documented my progress <a href="https://github.com/mdimado/github-actions">here</a>). But later, I found out that this project had already started getting a lot of participants, which made me lose interest in it.

A few more organizations that I found interesting at that time were, pharo, palisadoes foundation, Neutralinojs and WikiMedia Foundation. But because of similar reasons, either the projects already had a lot of early applicants or the domains didn’t really resonate with me, I didn’t take them seriously.
<br/>
Then came the year 2025. Time was running out, and I knew I had to choose an organization and stick to it, but I was still confused.
A few more organizations had released their 2025 project ideas, and I continued searching for organizations using the google search tools the same way, filtering by time to look for any newly updated organization/project pages, and manually checking if something interesting showed up.
On 30th January 2025, I found out the BEST project so far, 'Modernize the OpenPrinting Website with Next.js'. The goal of the project was to migrate the existing Jekyll-based website to a Next.js application, keeping the markdown rendering logic intact to continue serving the existing pages.
Another major task was to localify the Foomatic database, which meant making the driver database more manageable and accessible.
This project was a part of <a href="https://openprinting.github.io/">OpenPrinting</a>, a workgroup under The Linux Foundation.
<br/>
The required skills for this project were perfectly aligned with what I had been working on, so I started exploring the project in depth. I cloned their repository of the existing site and spent time understanding the codebase.
After doing enough research about the project, on 2nd February 2025, I texted on their communication channel, which was a Telegram group, introducing myself and expressing my interest in contributing to that project. To my surprize, I was the first one to reach out to them regarding GSoC 2025.
Two days later, Till Kamppeter, the head of OpenPrinting, texted back with a bunch of tasks to help me familiarize myself with OpenPrinting and the major projects they are working on, like CUPS. It took me some time, but I managed to complete all the tasks and texted him back with an update along with a few doubts I had.


<br/>
<h2>The Turning Point</h2> 
Till replied, clearing my doubts and appreciating my efforts. But, a few days later, he texted, 

***"Hi, the project idea of your choice got unexpectedly high interest also by other candidates. Therefore I am not sure whether we can assign this project to you. Therefore I want to kindly ask you whether you like to work with us at OpenPrinting also if you do one of the other projects, and if so which project(s) you prefer"***. This message hit hard. Up until that point, I thought I had found the perfect project. But instead of feeling disheartened, I took it as a sign to double down. I told Till that I’d be happy to work with OpenPrinting regardless of the project, and shared a list of other ideas I found interesting. From the list of projects, he replied, ***"your best bet (where nobody else did pick up on yet) is OSS-Fuzz for Python/Go."***
<br/>
Something that triggered me was, 'where nobody else did pick up yet'. Realizing that there was no competition for that project fueled me up. I started from the basics, spent hours and hours understanding the project, the basics of fuzz testing, testing in GO and python, dove deep into OSS-Fuzz's documentation and spent time understanding the four projects that were set to be integrated into OSS-Fuzz for this project. (I will probably explain the entire project in detail in my next blog) 
From the past two months, I’ve been learning and engaging with the mentors of this project, TT Fish (Jiongchi YU), who was a contributor to a similar project in GSoC 2024 under OpenPrinting, and George Andrei. After many emails and messages, I gained a solid understanding of the project. There’s still more to go, and I’m hopeful for selection and excited to be mentored and work with them. Fingers crossed!!
<br/>
<h2>What if I don't get in?</h2>
Yes there is a chance that I may not be selected as a mentee this year for GSoC 2025, but, no matter the outcome on May 8th, I’m excited to continue learning and growing in the open-source community.

***until it's my turn I will keep clapping for others***

