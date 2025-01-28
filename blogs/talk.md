---
title: 'Survival of the fittest?'
date: '2025-01-28'
excerpt: 'and a bit of github actions'
---

This wasn’t supposed to be my second blog. I had planned to continue writing about what I’ve been learning on the tech side. But this is something I feel needs to be addressed within me.  

I barely speak or socialize with people, and I often find it hard to start a conversation. Recently, I visited <a href="https://t-hub.co/">T-Hub</a> with two of my friends, where we got to meet the CDO and the chief advisor. We even met the founder and CEO of <a href="https://madscientist.tech/">Madscientist</a> again. Overall, it was a great experience.  

One thing I realized during this visit is that people only give you attention if you take the initiative and start speaking. No one is going to ask who you are or what you do. Honestly, no one even cares. The world is a very transactional place. The more you put yourself out there, even if it means bluffing a bit, the better it works for you.  

This isn’t directed toward anyone else but myself. I need to improve in this area. I have to push myself to engage in conversations, express myself better. It’s something I know I need to work on.
<br/>
Now, here's what I planned for my second blog. Over the past week, I've been learning GitHub Actions, and this was for the <a href="https://github.com/muzaffarmhd/PipeOptimizer">pipeline optimizer</a> project that I mentioned in my first blog. From what I understood, the workflows created using GitHub Actions can be used to automate anything from integration to deployment to testing. I have created a <a href="https://github.com/mdimado/github-actions">GitHub repository</a> for learning GitHub Actions. These are the topics I've learned:

<br/>


**1. Basic Introduction to GitHub Actions**  
The first script was a basic one, where I learned about YAML and the syntax of a GitHub Actions workflow.  

**a. The `name` field**  
Optional but used to give a name to the workflow.  

**b. `on` field**  
Events that trigger the workflow. In the first workflow, I used the `push` to the `main` branch.  

**c. `jobs` field**  
A collection of jobs to run. The job `build` is structured, and the `builds-on` field specifies the environment for the workflow to run.  

**d. `steps`**  
Each step is defined within the `steps` list. The `actions/checkout@v3` is used for checking out the repository code.  

<br/>

**2. Scheduled Workflows**  
The `cron` keyword, abbreviated as "command run on," is used to schedule a task. GitHub Actions uses UTC for cron schedules.  
`(* * * * *)` has five stars:  
**1st:** Minutes (0–59)  
**2nd:** Hour (0–23)  
**3rd:** Day of the month (1–31)  
**4th:** Month (1–12)  
**5th:** Day of the week (0–6, where 0 is Sunday).  

<br/>

**3. Setting Up the Node.js Environment**  
I created a workflow that automated building a Node.js project, including dependency installation, caching, and building the project. It was triggered by updates to the `main` branch.  

<br/>

**4. Using Matrix in a Workflow**  
The `matrix` keyword can be used to run a job across various combinations or configurations. I used a matrix to run a basic workflow across various operating systems.  

<br/>

**5. Secrets Management**  
The `env` key is used to set the environment variable with the value of a GitHub secret (this should be defined in the repository's settings). This way, the secret is not hardcoded in the workflow file or exposed in logs.  

<br/>

<br/>

Welp, that's a decent glimpse into github actions after a week of learning. I understood how tasks are automated but still need to spend more time identifying and addressing bottlenecks. As for the next phase of the project, the ML part, that’s what I’ll be focusing on this week. My plan for the next two weeks is to dive deeper into EDA.



