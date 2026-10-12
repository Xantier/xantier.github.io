---
layout: post
title: Extendable Frontend Architecture, part 1
teaser: First part of an architectural series of posts on how to create a truly extendable frontend application
tags:
  - JavaScript
  - React
  - Microfrontends
  - Federated Modules
permalink: extendable-frontend-pt-1
header: no
---

## Preface

Over the next few posts I will go over an approach on how to implement a web application frontend, with React, Webpack/Vite/Esbuild and TypeScript. The purpose of this is to demonstrate how it is possible to start including module federation into an existing application and how one would make a user configurable application from these building blocks. 

The phases of this series are as follows:
1. Architecture overview (this post)
2. Creating your first receptor
3. Packaging your first extension
4. Configuring your receptors and extensions
5. Overall solution and further steps

# Extendable Frontend - Architecture

Over the last decade or so frontend applications have grown from sprinkles of JavaScript to multi-team, multi-org endeavours where the scale is massive. This has introduced troubles with code organization and shipping it, similarly what has happened on the backend side of things. Indeed, this post will be another introduction to microservices, or as we are in the frontend world, microfrontends. 

I am not really fan of the buzzword nor do I like the microfrontends architecture is usually defined in the wider internet. The aspects that have been gathered to this kind of architectural pattern contains few unnecessary items that have creeped in from the backend variations of micro-* architecture. Within this series we'll touch on a more pragmatic, developer friendly approach to tackle the organizational complexity.  

## The Example App 

Within these posts we will work together to modify an existing React application to be an extendable, microfrontend buzzword worthy application. 