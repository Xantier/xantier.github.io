---
layout: post
title: Devoxx Belgium 2016 report
teaser:
tags:
  - Conference
  - Devoxx
permalink:
header: no
---

As an innovation driver for our development team I had the opportunity to attend a software developer conference Devoxx in Antwerp early November.

Devoxx is an annual commercial European Java, Android and HTML5 conference. The conference takes place every year around November. With 3500 attendees it is the biggest vendor-independent Java conference in the world. Speakers are usually industry thought-leaders from leading companies, including Java language architects from Oracle. The event itself has outgrown its venue the Kinepolis movie theatre and many of the more interesting talks needed to turn people away.

The topics on this years conference revolved around microservices and everything that those bring in as additional complexity. Machine learning was another big topic with major cloud providers presenting their solutions on everything starting from speech recognition to sentiment analysis.

Java 9 is around the corner so Java language chief architect gave the keynote speech. This version will finally introduce the long awaited project Jigsaw to the language core. Jigsaw will finally bring built in modularity to the Java world. It will also help users to have more finegrained control over what to expose from a module. Another addition to the language is something that other languages have been taken as a given for many many years. JShell will introduce a long awaited REPL (Read, Eval, Print Loop) for Java to help on rapid prototyping and debugging.

## Trends for 2017
Core language changes aside, if we take a look at one of the big topics on the last few years it seems that a lot of the direction software development is currently going revolves around one thing or is at least heavily influenced by it.

### Microservices

Microservices, microservices, microservices. This buzzword has been making rounds for few years now. It was very evident in the conference that even the architects who have a long time ago built their ivory towers had heard of microservices.
The increase in amount of data drives the need to break applications into more granular parts. The pace of software development is increasing and microservices are the promised cure for that. Another big selling point for these little guys is their modularity and the implicit ability to keep separate parts of the application truly separate.

### Reactive Programming

Another loud topic in the conference was reactivity. The whole world is striving to be proactive, the programming world is looking to be reactive. Reactive programming, in all its varieties, was everywhere on this year's Devoxx. There were multiple talks about reactive systems, reactive functional programming, reactive frameworks, reactive streams... Reactivity ties in closely with microservices and the need handle, once again, more and more data efficiently. Even Java 9 included reactive streams APIs on its new update on a very short timeframe.

On Devoxx we saw talks about the old dog RxJava as well as Spring framework's Reactor and Akka from Lightbend/Typesafe. On top of that multiple reactive web frameworks presented their efforts to make systems more responsive, resilient and elastic. This kind of direction seems natural when weighing against last few year's trends on functional programming and immutability as well as microservices and distributed message driven systems. Reactive style seems to fit very nicely on that world and I believe the discussions around reactivity will increase quite a lot in 2017 when message passing becomes more common.

## Baggage of Microservices

Looking back to Microservices, they also bring in a lot of additional movement around core development work. Some people might call this additional baggage, but I believe the direction is correct since due to this the innovation around the core architectural decisions are picking up speed as well.

The first and foremost is the development work itself and architecture around the applications. Without a doubt most of us are working on legacy monolithic applications so those are needed to be migrated towards microservices. If that is the desired direction, of course. On Devoxx multiple presentations were touching this subject specifically.


### Big refactor

One of the more interesting presentations was about componentazing old monolithic application with the help of Java access modifiers itself. The talk itself didn't move applications towards microservices but was more of an architectural discussion around bounded contexts and how to keep our monoliths modular.
Also interesting talk was a presentation about ways to restructure databases better to work with microservices architecture. The talk went through common use cases for database migrations and tools to help automate them. In microservices architecture downtime should be minimized and therefore the biggest culprit for downtime, database migrations, should be approached differently as well. Bit topics around this are backwards compatible migrations and event sourcing as a way to migrate monolithic database to more granular microservice compatible data stores.


### DevOps

Other side that will be changed by microservices are operations, application monitoring and deployment. The cycle of releases will be more frequent and old style release processes are producing too much overhead to operations team. In the conference the few year old buzzword, DevOps, was thrown around liberally. Automation of everything has probably been the main point of DevOps teams for last few years already and microservices revolution will accelerate that process even more. Continuous Delivery has been around for a while and will continue it's journey outside of core software development teams on 2017 as well.
Github has been pushing continuous delivery, continuous deployment boundaries for a while now. They presented their  processes around DevOps, where everything goes through their chatroom and automated chatbots, introducing the concept of ChatOps. There were also multiple talks about delivery pipelines with the help of Fabric8 and Jenkins. Cloud native application deployments were presented in few situations with the help of big cloud provides, these processes brought another new buzzword to the table as well, NoOps.
Monitoring and logging was another aspect that will be changing from legacy solutions with the rise of microservices. Since environments will be shortlived and replaceable a central place for logging will need to be introduced. With microservices applications will be more and more distributed and flow of data will make more jumps across service boundaries. That means that also a centralized place for monitoring and tracing abilities will need to be introduced on applications.


## What to look forward to in 2017

This year Devoxx seemed to be revolving around Microservices, Reactivity and Machine Learning. It seems that these trends will be the ones that development teams around the world will need start paying attention to in 2017. Introduction of Java 9 will bring modularity back to the minds of developers and microservices will mold that thought process even more. Reactive programming and reactive systems are going to keep pushing functional and declarative programming style even amongst Java developers. Machine learning will probably make its entrance to wider audience, probably along with the introduction of new user interfaces in the form of chatbots, automated assistants and speech recognition.

All in all the feeling in software development world still is that we are in the cusp of a tectonic shift when it comes to programming style, distributed application architectures and data processing & analytics.
