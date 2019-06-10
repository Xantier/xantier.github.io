# Developing, Fast and Slow



Initial idea from Enrico. He didn't get around demonstrating this.

What does it mean?
In the end we all have two clients:
1. Actual clients
2. Other devs and ourselves

Selfish viewpoint? Not necessarily, software goes through entropy [quote]

## Entropy 

"Lehman (1985),[2] who suggested a number of laws, of which two were, basically, as follows:
A computer program that is used will be modified
When a program is modified, its complexity will increase, provided that one does not actively work against this.
"
https://www.toptal.com/software/software-entropy-explained

Broken window theory

- What does entropy mean?
- What does it do?
"
The process of code refactoring can result in stepwise reductions in software entropy.

Software entropy is increased[clarification needed] with accumulation of technical debt."


## Clients
What do the clients want?

When to write good code?

Half built refactorings.....

Boring developer/choose boring tech/etc.....

Which problem do you want to solve? Solving something for the sake of solving it or actually producing value?


Isolated things not so matter that much
- in the end, hackers quote

- global things, matters a lot
  - take your time

military quote: 
" I divide my officers into four groups. There are clever, diligent, stupid, and lazy officers. Usually two characteristics are combined. Some are clever and diligent — their place is the General Staff. The next lot are stupid and lazy — they make up 90 percent of every army and are suited to routine duties. Anyone who is both clever and lazy is qualified for the highest leadership duties, because he possesses the intellectual clarity and the composure necessary for difficult decisions. One must beware of anyone who is stupid and diligent — he must not be entrusted with any responsibility because he will always cause only mischief." -General Kurt von Hammerstein-Equord



- Hell, we can write most of the application with Excel sheets and some clever macros


Predicting the future is very difficult


"
The goal of enterprise dev process is no matter the outcome is, nobody is to blame.
"


"
No, because the quality of the existing code isn't what affects my interest in the job. The vast majority of software out there has mediocre structure at best. Your responsibility is to improve it gradually, leaving each function or module you touch a little bit better than you found it.
The jobs I've enjoyed the most and learned the most from were incidentally the ones with the worst codebases.

That said, it's probable that there's a certain degree of awful that it's simply impossible to work productively with. As a hiring manager, I wouldn't consider it unusual or a red flag for a developer to ask to see the codebase; and every project has at least some code that isn't too sensitive to share (well, there are probably some exceptions in regulated industries).

If a developer doesn't have the maturity to be willing to work with a codebase that's six years old, where the earliest layers were quick-and-dirty proofs of concept developed without automated testing just to get a startup off the ground, and the latest are better but still flawed, then they're a poor fit here anyway. We need developers who understand that the code exists to serve the business and not for its own sake.

dcole2929 3 days ago | parent | on: IT Runs on Java 8

In the majority of companies it's simply not possible to operate on the bleeding edge the way HN articles would have you believe you should. Besides the obvious issues around the value of rewriting stable legacy systems on new platforms, there are also man power issues. You need tier 1 developers to live on the bleeding edge because any problem that comes up (and they will come up) largely requires you to solve it yourself sans the help of the greater internet. On a legacy system an average dev can generally Google any issues that arise because they are known problems.
When dealing with new tech it's a lot more likely to be the first person to run into some obscure use case no one has ever experienced before. And in that case you need devs who are not only capable but willing to invest in solving the problem. Sometimes that means, re-architect something in the stack and sometimes it may even require making a PR to the original project. That's a lot of investment that may make your devs happier but probably provides little concrete value to the business.

That said I'm still building on elixir so what do I know.
"


" If the quality of the code is only getting worse that makes my life as a developer pretty miserable."


Shameless green
https://18f.gsa.gov/2016/06/24/5-lessons-in-object-oriented-design-from-sandi-metz/

