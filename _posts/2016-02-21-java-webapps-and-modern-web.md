---
layout: page
title: Series intro: Java webapps and modern frontend
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

# Java webapps and modern frontend

Something I've been playing with in my head quite a bit has been the transition of moving from old Java + Spring MVC + JSP/Thymeleaf/whatever style web sites to modern progressively enhanced web apps using more modern technologies. I want to touch few of the points that I've found useful during my journey doing that.

Old Architecture style
We all know this and will inherit a bunch of codebases that will be built this way. Big thanks to anyone who has every written tutorials and templates to do this, there must be tons of them online since a lot of Spring stack using folks seem to follow the same pattern. So how does a Spring MVC Web "App" look in my mind?
Let's take a look:

Backend Architecture:

* Maven/Gradle (Ant [lol])
* Multimodule Spring Monolith
  * Data/Model/DAO/Repository/et cetera
  * Services
  * Controller/Web
    * Controllers
      * A controller per page
      * A controller method per page operation
    * Converters
    * Validators


* Data Flow
  * ![Backend data flow]({{ site.url }}/assets/img/sFcwlc1Osiy__F3W1zS1jzw.png)


Frontend Architecture:

* Assuming maven directory structure
  * Webapp
  * Web-INF
  * Views containing JSP
    * One JSP view per page
  * JSPs containing HTML
  * HTML containing stylesheet tags, stylesheet files serving CSS
  * HTML containing JavaScript to enhance the experience

* Data Flow

  * ![Frontend data flow]({{ site.url }}/assets/img/sSvtDSaB20KSs5kjvxxOqmg.png)


If we think about this from a viewpoint of back/front threshold, the architecture seems like a nice and clear solution for individual websites that don't do much dynamic stuff, ie. stuff other than displaying images and text. It might even be good for simple CRUD applications that don't need dynamicity or good (or even decent) user experience. Our goal here is not to build those kind of applications, we want to make something different, something that gives our users a better experience as well as our developers a better tools and processes to build the application.


If you are finding bunch of similarities on your codebase and the architecture described above, you might be interested in the series of posts I intend to write on it and how we make a transformation from it to a modern web app. Yes, that means that you might have to take a look at some of the technologies and techniques that "those hipsters" in Silicon Valley are using.

The end result that will come out of this process is still a little bit hazy and unclear even to me since the world is moving at a fast pace in the world of web development. Regardless of that, let's hope we are able to find a way to make developers, users, our servers and even product owners happier during the process.

Lot's of words, not that much actual info, let's take a look how the architecture could look like. Maybe something like this could work?

Future architecture:

Backend:

* In most parts pretty much the same as original
* New things in most cases:
  * RESTified Controllers
  * Flattened models communicating on the front/back threshold


Frontend:

* Node.js as a middleman server
* Progressively enhanced instant loading web application
* Universal / Isomorphic JavaScript
* Persisted data models for frontend
* Server rendered and API driven communication between backend and frontend


During this I think it might be good to go through some DevX enhancements that we will gain during this process.

  * Test driven development cycle for frontend resources
  * Instant feedback cycle when developing
  * Compiled CSS and JavaScript
  * Transpiled languages and their interoperability with traditional web app
  * Frontend Continuous Integration & Continuous Deployment process


  Until next time, when we really get to the meatier bits.
