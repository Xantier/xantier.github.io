---
layout: post
title: Architecture of a Node.js "minilith"
---

Even though the ideal use case for a Node.js is usually a microservice based architecture there are some applications where we should go [monolith first](http://martinfowler.com/bliki/MonolithFirst.html). One example of this would be a standard CRUD application made for example only for internal enterprise usage to fill in, let's say, travel expenses. The purpose of this post is to outline how one would go on about building such an application, an application small enough in size that it is not needed to be split up in different services but yet customized enough that a somewhat rational thinking is needed before developers start hacking away with it.

I would list the basic building blocks for our minilith on Node.js to be:
 - DB connectivity
 - Build tooling
 - Internal services
 - Controllers
 - Models

On top of this we would list views but since those fellows depend so much on implementation details I will not touch them so much on this post. For now we assume that we are building an SPA and that our views served from Node.js consist only of a single body tag, few script links and few CSS links.

Lets touch each of the listed items individually:
 When I discuss about <b>DB connectivity</b> I am talking about our repository and DAO layers in our Node.Js minilith. In Java world sometimes all DAOs maybe replaced by some kind of wrapper like Hibernate, in Node world there are few libraries that might do some similar things for us. I am a big fan of SQL since it is developer optimizable to the end of the world and gives devs more flexibility on their queries. This is also why I am a fan of the DAO layer.