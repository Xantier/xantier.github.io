---
layout: post
title: Scaling
teaser:
tags:
  - Career
  - Soft Skills
  - Learning
permalink:
header: no
---

I wanted take some time and reflect on my time as a software engineer but this blog post inda ballooned into an essay about stages on a software engineers career and dimensions of engineering competency that affects our aspirations to become a better developer. 

I have divided software engineers career into 4 different stages that I consider people go through before either feeling comfortable enough in the chosen location or moving into different direction in their career or being forced into a more 'non-technical' role.

# Stages

## Youngling

Straight out of school. Starting eagerly and tackling tasks given to them. Depending on enthusiasm on the occupation moves fast or very fast, but regardless is moving forward at a fast pace. Discussions at work usually revolve around tasks, patterns used within the code base and syntactic issues of chosen language. Difficult aspects of programming at this point are design patterns, common best practices and in general trying to find a comfortable way to deliver needed tasks. The way out of this stage is to crank out as much code as possible, creating side projects, investigating technical literature and patterns of chosen language. Trying out those patterns, and usually ending up overusing them for the sake of training.

Terminology:
- Tasks
- Syntax
- Codebase


## Padawan

After much of the syntactic issues have been overcome the next step is usually a stage of arrogancy. Capable of discussing code, understanding syntax and isolated strategies of abstraction. The amount of WTFs/minute as a code quality measure is usually the highest at this stage, regardless of the actual quality of the code. The rules and laws of a language, framework or pattern have been learned and because of that the it is easy to spot mistakes in other peoples' code. It is often "unfathomable" how bad code other people tend to write. Capable of discussing issues with the team, fleshing out pieces of features whther or not actually understanding the underlying ubsiness value for them.

Terminology:
- Frameworks
- Patterns & Abstraction
- Features
- Developers

## Jedi Knight

As seniority grows a bunch of maturity enters to the equation. Arrogance fades away when understanding on tradeoffs grows and the vision expands to see the multiple signs of a single coin. Initial steps to start architecting subsystems starts. Due to longevity of a career and experience on multiple paradigms, languages and frameworks able to bring fresh ideas from other scenes to apply them into current solution. Mentoring other devs, driving business decisions and paths to create big features

 This is closely tied to the deeper difference between junior and senior roles: a junior person’s job is to find answers to questions; a senior person’s job is to find the right questions to ask.

Terminology:
- Paradigms
- Business value
- Architecture
- Teams

## Jedi Master

Guiding teams, composing systems and foreseeing consequences of decisions made. Able to see possible downfalls in taken direction and capable of diverting it towards a better path. Deciding product road maps and long term technical directions. Understanding that the rules learned in previous stages are meant to be broken and able to bend them to find solutions to complex problems. Modifying processes and molding working culture to enhance decision making and directions within teams. 

Note that not many people achieve or want to achieve this stage on their careers.

Terminology:
- Systems
- Products
- Companies


> "I think it's beautiful that most of the time developers both start out as and end up as scrappy hackers." -Andres Blixt


# Dimensions

If we think about the skills a software developer will find useful on their journey we can boil those down into three different dimensions. I have chosen to make the expected split between technical skills and soft skills, and then accompany that with maturity. If you will here are the definitions of these dimensions:

* Tech - Matter
  * Skills in: Programming languages, tools, frameworks, libraries and algorithms etc.
  * Everything a university usually teaches to you.

* Team - Space
  * Skills in: Negotiating, managing people, empathy and being a good co-worker.
  * Communication and leadership skills 

* Maturity - Time
  * Mistakes made, blood drawn, blood bled, decision making skills and self-confidence. 
  * Mental side of development




Note that not being the best in all of these is needed to be a good programmer. Some decide to take a path to focus on more technical aspects and are happy on that path. They might value hard problem solving and algorithms, having a neverending drive to learn more about tech. Some might not be so interested in hard tech and want to focus on team values more. Their career paths might divert into [agile buzzword] people, dev management or business analyst roles. 

The only thing that in my mind seems to keep on growing is maturity. That will naturally enhance both technical skills as well as team work.

In the following sub sections we'll go through few observations that might be helpful for an individual to become better in these dimensions.


## Tech - Matter

### ABC - Always be coding 


#### Aim for 60 hours per week
Uncle Bob mentions in Clean Coder that everyone should be aiming to do 60 hours of coding per week. If you want to become technically very good that is probably a good advice. We should split that 60 hours to 40 hours of coding for work and 20 hours for ourselves. Work gives you structure, real business problems, and lots of edge cases to solve. Especially the ability to tackle real business problems is useful. If we think about edge cases we know that tackling those will give us appreciation of clean and simple design, something that is adaptable whenever the pointy haired boss decides to change the direction. The other 20 hours working for our own amusement should go towards side projects, trying out new tools, frameworks and languages, reading articles and reading tech literature.  Granted, 60 hours per week takes a lot of effort, in the end civilized world usually has good work life balance and 24 hour on call position are luckily isolated to workaholic americas so it might take some time to get use to that kind of schedule. 

Luckily most of the tricky parts of tech are also learned early on in a career. This helps because time is of course very limited to all of us. It is important to understand that eventually there is somewhat of a glass ceiling when it comes to learning tech. There is simply too much to keep up with and sometimes viewpoints, career directions and our interests change when we grow older.


#### 1.01 > 0.99

Another approach that I like to follow, especially on hectic months and years when 60 hours a week seems too much. This comes from a motivational poster. 

- 1.01^365 = 37.8
- 0.99^365 = 0.03

When we are learning things those will accumulate on top of each other. Therefore the calculation mentioned above tends to make a lot of sense. At times there might be shortcuts between paths but gaining deep knowledge does need a foundation that it can use to build on top of.

In the end, a small effort everyday accumulates a lot over time. It doesn’t take much daily to become better. I believe that this daily practice is one of the reasons we have these mythical 10x developers. When comparing someone who practices daily to someone who half-asses their professionalism the gap grows fairly large very fast.

###  Know your tools, no matter what they are.[draft] 

#### Physical tools and OS

If you are using Mac (switch away immediately), learn to customize your tools, learn IntelliJ, learn keybindings, learn to automate tasks done regularly, get comfortable with your physical tools, find the correct screen sizes, keyboards, mice, desks, working positions that work for you. That way you can focus on the code itself. Talking about laziness, is a good quality, if you can harness it properly. I’ve often said it’s ridiculous that for example Java devs don’t pay for IntelliJ, which comes down to something like 100€ a year, their keyboard, a proper computer etc. when they spend 40 hours a week working with those. 

#### IDE and debugger


#### Deployment targets



### Learn to read code

Read libraries, frameworks and code written by someone else, with a completely different signature than yours
The most important and overlooked thing is the ability to read code. Writing is easy, it is trivial to make things work with code. You can hack and slash, try things until they fit into place to achieve something that works. We rarely consider that most of our time in front of a screen is spent on reading code. Therefore it is very important to understand the data flows through the codebase, how an application is wired together. Whether it is back-and-forth flow from an API to DB and back or event sourcing driven architecture. This is why at the current climate strict Object oriented programming is not my preferred paradigm to follow code. Side effects hidden within objects makes it very very difficult to follow the data flow. Instead we should be moving towards less cognitive load on our code and simple transformations on simple and possibly shallow data structures.

### Venture other languages and paradigms

> "To learn a language is to have one more window from which to look at the world" 

-Chinese Proverb

On hard tech the biggest leaps I've made have come from taking on something completely different than my technical comfort zone and tackling some decent sized project (let's say few months of 15-20 hour weeks) with it. Things like building toy apps with Haskell, Elm, Clojure, automating deployment processes with Ansible, adding a monitoring solution with Prometheus or creating an isomorphic app with React/Express were these semi-sized things that took me away from pure backend Java development world. Exposure to different environments helps a lot since it gives so many new ways of thinking about the "main" environment where one would be working and it exposes more tradeoffs on both sides of the fence.

> "Programmers with lots of hours of maintaining code eventually evolve to return early, sorting exit conditions at top and meat of the methods at the bottom.
Same way you evolve out of one liners.
Same way comments are extra weight that should only be in public or algorithm/need to know areas.
Same way braces go on the end of the method/class name to reduce LOC.
Same way you move on from heavy OO to dicts/lists.
Same way you go more composition instead of inheritance.
Same way while/do/while usually fades away, and if needed exit conditions.
Same way you move on from single condition bracket-less ifs. (debatable but more merge friendly and OP hasn't yet)
Same way you get joy deleting large swaths of code."

### Read These
1. Pragmatic Programmer
  * Read this yearly, buy few copies to your coworkers
2. Clean Code
3. Code Complete


 ## Team - Soft
Reading code:
- Everyone has bad code
- Don’t Judge
On discussing code: 
- Listen, don’t preach
- Language, especially questions (why tf, what tf, who tf etc.)
- Give it five minutes, dismissing is the easiest thing to do in the world
### Practice Egoless Programming

#### All code is bad from someone's point of view
For these occasions we have to remember that the paths we have taken are different, someone might come from a corporate place where office politics have played a large role, someone might come from a startup where shipping fast and breaking things has been the norm. Regardless of the background, we have to believe that everyone is doing their best and tries not to be malicious when they are working on a codebase. It is important to understand, and accept that you will make mistakes, everyone will make mistakes. If such thing appears, usually the best approach is not to be a dick about it. It’s also good to remember that there might be good opportunities to mentor other people on things they might be not aware of. In the end mentoring is probably the best way to learn. It is one of the reasons I like to present, it drives me to do more research on things I am supposedly knowledgeable of.
We as programmers have a tendency to see everything as bad, legacy, fugly hack or something similar. That comes from not understanding the journey a single line of code has taken to reach that point in the codebase. 

#### Hol' up, sit down, be humble [draft]

Learn to take criticism, admit ignorance and be flexible

That is something that is important to understand when thinking about working in a team and communicating with colleagues. The inability to be flexible, take criticism or admit ignorance is an issue that might be difficult to overcome but it is very worthy thing to try to achieve. In the grand scheme of things I genuinely believe that it is better to have an inexperienced dev who is aware of their pitfalls, who understands that they have a lot to learn than someone who is a self proclaimed 10x dev, someone who is arrogant or unable to think about other point of views. 
"Modern software development is almost always a team game. A lot of us are a little socially awkward but there's a big difference between that and being incredibly annoying or impossible to work with."

#### Make friends with QA
QA is there to teach you what you did won't do in the future you are a better developer

### Enforce Good Communication

#### Listen more than you talk
In the end we want to make our decision from the best possible place. By listening more we gather more knowledge and are therefore in a better place to discuss ideas and make decisions. Generally our industry contains a lot of introverts which gives louder mouths more time and space to speak their minds. Since we are working in a team environment that is definitely not a good thing. The more ideas we get thrown out there the better our decision making ability is. 

#### Mind your language
Especially when talking online. I usually think of my tone before I put in question words. It could be just me but starting sentences with ‘why’, ‘what’, ‘who’ . It comes down to differences between ‘why did you’ and ‘why is this’ etc. might feel aggressive online and correspond to wtf, wtf and wtf when talking offline. When we are talking about code, we should be talking about code. At that point it doesn’t have an owner, it is owned by the whole company, the whole codebase. That is btw also why it’s silly to leave those IDE generated comments on the top of file telling who wrote this and this class, all code is owned by the team. If we need to find out who to discuss about the path they’ve taken to an individual line of code, we have version control telling us that information already way more reliably.

#### Disagree and Commit
It is not always possible to come to an agreement. Amazon famously brought their 14 principles of leadership where disagree and commit was one of the steps. There is no reason to stay fretting about a disagreement over decisions made. It is better to bring in disagreements in the early stages of decision making process, after the decision is done, there is very little useful that can be done about it, apart from committing to fully implement according the decided solution.


### Practice Empathy

#### Don’t dismiss ideas, don’t blame others, offer alternatives instead

A snippet from Basecamp's company blog: 
> "If you aren’t sure why [not dismissing ideas immediately] is important, think about this quote from Jonathan Ive regarding Steve Jobs’ reverence for ideas:

> "And just as Steve loved ideas, and loved making stuff, he treated the process of creativity with a rare and a wonderful reverence. You see, I think he better than anyone understood that while ideas ultimately can be so powerful, they begin as fragile, barely formed thoughts, so easily missed, so easily compromised, so easily just squished.
That’s deep. Ideas are fragile. They often start powerless. They’re barely there, so easy to ignore or skip or miss."

> "There are two things in this world that take no skill: 1. Spending other people’s money and 2. Dismissing an idea."

> "Dismissing an idea is so easy because it doesn’t involve any work. You can scoff at it. You can ignore it. You can puff some smoke at it. That’s easy. The hard thing to do is protect it, think about it, let it marinate, explore it, riff on it, and try it. The right idea could start out life as the wrong idea."



#### Empathy

> "Most software is intended for a human audience. And so hackers must have empathy to do really great work. It is probably the single most important difference between a good hacker and a great one. Without empathy it's hard for people to design great software, because they can't see things from the user's point of view." - Paul Graham

"There is a weird idea that empathy is something that makes you good. In reality what it is is neither good nor bad. It's the ability to put yourself in the emotional state of someone else to understand things not only from their rational point of view but from the point of view of them as humans with both irrational (emotional) and rational perspectives."


Soft skills, as anything else are things that can be practiced. Working in a team, attending events, having pints, playing team sports, travelling, meeting other people all give good material to train and practice, learn empathy.
> "Personal skills and greater self-awareness are what really fast-track you."

### Venture other languages and cultures
Like learning technical skills, I think also soft skills benefit a lot from learning another language, travelling to other cultures. Much like learning new paradigms when programming, also learning new cultures shift your mindset towards more empathy and gives you more understanding and ways to possible understand how other people think. Also, it seems that the opposite - not travelling - breeds Trumpy things and Brexity thoughts


> "Bad engineering cultures are measured in WTFs-per-minute.
Good engineering cultures are measured in ROFL-copters-per-minute. When talking about the exact same things."
* Reginald Brathwaite

### Read These
1. Dale Carnegie - How To Win Friends And Influece People
2. Clean Coder
3. Passionate Programmer



## Maturity - Time

### Be Patient

#### Don't chase the shiny
Software industry moves fast and because of that it gives us the ability to just ‘enjoy the ride’, following celebrities or ‘rockstars’ and driving the latest trends. At times this might work but anything in moderation is the best approach to this as well. Gaining true knowledge is difficult and there are many paths you can take to attain it. When considering the new framework, new library or new language we have to think about the motivations behind the publisher as well as the reasons why we are interested in it. Facebook created React, which I love, for internal use, then started using it as marketing tool to hire devs. Kotlin is created solely to sell more Jetbrains IDEs, they have been publicly saying that from the beginning. Someone making their own library might very likely be a personal branding project where they are collecting Github stars. 

It is important to be smart when making decisions about what shiny is good, what is shiny only because it is made to reflect something bright. This is difficult and we can’t always be right about this. At times we miss out and need to catch up, at times we jump into the wrong hype train and need to track back.
Which one do you want: 10 years of experience or 10 times 1 year experience? You can't always be starting from beginning on everything you do.

We as programmers very often tend to come to a conclusion that everything done before our time is, quote-unquote shit. We criticize solutions made before for the sake of criticising. Working on a legacy codebase is deemed unpleasant and every time we can, we want to somehow carve our own piece of empty land, a greenfield project out of it. It doesn't matter whether or not the current architecture supports our aspirations to create something, 'that is our own'. That is understandable, legacy code is hard, a lot more thought process has gone into thinking and writing that individual piece of code that a developer looking at it for the first is able to understand. Humans are usually not able to comprehend all the decisions made for a piece of code and therefore rather than try to understand it, how the data flows, how objects work and why it was written as it is, we usually deem it unusable and opt for a rewrite. I don't think rewrites work, I have never seen a rewrite succeed. I challenge you to show me one project that has been rewritten, instead of refactored, and it has been a success.



### Trade-offs, there are always trade-offs 
What I’ve figured out to ask myself always is that what are the tradeoffs on every decision made. There will always be trade offs, so in the end the actual important decision that we are making is to pick the smaller subset of those bad aspects. These trade offs come in many forms, whether it’s ease of hiring, making the function “correct” or shipping faster,  ease of training, actual technical superiority, or following the industry hivemind. It is never a black and white decision. Something being objectively "better" doesn't mean it's a good engineering decision to adopt it. We need to understand that Computer Science and Software Engineering are two different fields. Computer Science wants to find the perfect solution to a problem, Software Engineering the best working solution to a problem.



#### Use your subconscious to your advantage
The best way to find a better solution to a hard programming problem is not in front of a computer staring at the more complicated solution, but in the shower, while you exercise, or even while you sleep. Life balance consistently leads to better more simple solutions. For me the decisions come at night, three hours into sleep. I’ve noticed this to be more of a pattern than I would like it to be. Btw, keeping a notebook on a bedside table and writing down those solutions will give you the ability to fall asleep faster. This of course contradicts with few bits I’ve said earlier, working 60 hours etc. The thing is, after gaining technical knowledge to a certain level our mindset changes and thought patterns go more towards decision making rather than finding more knowledge on tech. In the end it all becomes “design and code” like Vasily says.

### Believe in yourself

#### Know that imposter syndrome exists
Of course at times we feel inferior on what we do. It could be that someone has luckboxed on to learning the exact solution you have been struggling with for months and that makes you feel down, or someone has shipped a nice shiny project on Github with 100% test coverage and beautifully crafted codebase. We need to remember that if someone post a code snippet into Twitter, that has probably been brewing on the background for months, Github released projects might be fresh repository cloned from a years old project. What we are usually missing are the actual steps anyone has reached their final solution. There is always multiple failed attempts behind every solution. I don’t write perfect code, far from it. I copy-paste shit from Stackoverflow without second thought, I write “fugly hacks” everywhere, sometimes because I can’t think of a better solution and I’m too tired with “this shit”, sometimes because I don’t actually have the needed knowledge to do better. Like when I’m writing CSS for example.

#### Be courageouswhen diving into the code base
Note that this is courageousness, not fearlessness. Fear is a good thing, it gives you that nagging voice to remember to actually compile, run and test your program before shipping it, everyone should be afraid of a large codebase, everyone should strong enough to work on it regardless of that fear. Courageousness comes a lot down to reading the code, reading the systems and understanding the overall structure. Whether it is a technical decision made about hard things or a business decision. Like mentioned earlier it is very important to commit, whether or not you are certain that the solution is 100% correct. On codebase side that’s why it is so important to understand what the patterns, architectural decisions and structures in a codebase are. When the data flow is understood it becomes much easier to be fearless when modifying code. The thought patterns on this usually change the further we go in our career. When we get older, more removed from the codebase there is often somewhat aversion towards new technologies. That might be because of fear of change, might be because we have seen a similar solution fail earlier already. Whatever it is, it is important to remember to move forward and not stand still only because of fear of the unknown. We have to remember that deciding to do nothing is a decision in itself as well, and if that decision is done because of fear, it will probably end up being wrong.


#### Make mistakes, and then fix them [draft]
It is important to make mistakes, whether it’s choosing the wrong data structure, taking on a too big of a task, or being part of a group who orders three trays of shots on a Thursday evening.
“Remembering the alternative: never making mistakes, therefore never learning from mistakes and when you do finally come up against a problem that's beyond you, you fall all the more harder. There's no greater teacher than a mistake. It is much easier to mold your brain in the presence of pain -- use it to reprogram yourself based on what you've learned from the mistake.Also it’s important to remember you probably make 10-12 major decisions in your adult life. Nobody get's a 100% right. So everyone has a quota of two or three major screw-ups in life. Treat it that way, push it to the past and move on.”
Also it is important to shelter people what kind of mistakes they are making. sometimes people are not ready to make a decision on some parts of the development. At that point the mistake is on higher ups letting that decision making process leak down to someone who wasn’t ready for that yet. Regardless of the situation, it is a good learning process for all parties.
In the end, we will learn from those mistakes and come up with a solution to prevent it from happening again.

### Think before you act

#### Use commmon sense when developing

If something looks like it might be wrong, discuss and try to find a better way to do it.

Thinking about technical debt. There might be some of ti and we should try to handle it. At times there are patterns in the codebase that feel funky, that seem stupid or that are just plainly wrong. At times there are hacks that have been done for a reason, because some restrictions have been in place at the time of writing or because time constraints at the time have needed a good enough solution. These are not set in stone, if something like this comes up it is usually better to try to find the reasons behind decisions made in ancient times rather than blindly copying the approach and going with it. These kinds of things stack up on top of each other and the longer they go, they harder it is to make the correction to a better solution. Coming back to imposter syndrome, we all make mistakes and ugly hacks, before following those it is important to understand reason behind those hacks. Maybe the playing field has been leveled and a better path forward is available.

#### Understand cost of abstractions and cost of over-engineering [draft]


#### Be aware of your external dependencies [draft]
"Foundational. The pillars of your app. I think that web frameworks, testing libraries and significant Javascript and CSS libraries belong to this category.
Core libraries. Libraries that, while not foundational, are widely used in your app and cover horizontal needs. For example, fixtures-support for testing, JSON-serialization systems, libraries for soft deleting records, etc.
Utility libraries. These are libraries you use in some places for specific needs. For example, a library for generating PDFs, an API client for some system, etc."

> "Only those that have travelled the road know where the holes are deep" - Chinese Proverb

### Taking specific steps to get better
Planning, making goals
Keep a daily journal
Plan your years: 8760 hours, https://alexvermeer.com/8760hours/

## The actual reason it all exists

"The paying customer doesn’t care, they only want a working solution. Frameworks and ideologies don’t matter to them."
Getting the software out there wins every single time. It is we as developers that have the responsibility to 1. Actually finish our features and 2. Finish those features in a way that is forwards compatible enough for the software to grow. That is not an easy undertaking, that is what makes this industry so challenging, and that challenge is what pulls me at least out of the bed every single morning.



### Read These
1. Thinking, Fast And Slow
2. Zen And The Art Of Motorcycle Mainteinance
3. Mindset

# Tangibles
## People to follow
Raganwald
Venkat Subramaniam
Kevlin Henney
James Long
WeRateDogs
Axel Rauschmayer
Expert Beginner
Dan Abramov
Sebastian Markbage
Martin Fowler
Uncle Bob Martin
Joel Spolsky
Jeff Atwood
Kyle “Aphyr” Kingsbury
Li Haoyi
Stefan Tilkov
ThePracticalDev

## Blog Posts & Articles
the-ten-commandments-of-egoless-programming/
things-you-should-never-do-part-i/
our-leadership-principles
97_Things_Every_Programmer_Should_Know
give-it-five-minutes
Taxonomy-tech-debt
mental-models-i-find-repeatedly-useful
What Is Code?
Mythical 10x programmer
Practicing Programming

## Talks
https://www.youtube.com/watch?v=nVZE53IYi4w (12 ways to make your code suck less)
https://www.youtube.com/watch?v=NSzsYWckGd4 (Declarative thinking, declarative practice)
https://www.youtube.com/watch?v=DSjbTC-hvqQ (Code is the easy part)
https://www.youtube.com/watch?v=f84n5oFoZBc (Hammock Driven Development)
https://www.youtube.com/watch?v=ji5_MqicxSo (The Last Lecture)
https://www.infoq.com/presentations/Simple-Made-Easy (Simple made easy)
https://vimeo.com/71278954 (The Future of Programming)	

## Books
Clean Code, Clean Coder, Pragmatic Programmer, Passionate Programmer, Soft Skills Software Developer’s Life Manual, Effective Java, Effective Javascript, Javascript Allonge, JavaScript Spessore, Developer Hegemony, Domain Driven Design, Quality Code, Mythical Man Month, Code, Refactoring, Test-Driven Development, Peopleware
