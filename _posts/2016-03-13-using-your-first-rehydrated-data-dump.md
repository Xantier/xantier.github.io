---
layout: page
title: Java webapps and modern frontend - Using Your First Dehydrated Data Dump
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

# Jumping from rehydration to dynamic web app

Previously we figured out how to inject some data from out Spring controllers directly to the server HTML page and transform that to a Javascript variable. This time we'll take a look at some patterns that could be helpful to manage multiple data sources in our app.

In modern web applications we usually have multiple sources of data. Usually these are at least the data that is bound to the document object model or DOM and the data we have loaded via AJAX/XHR. When thinking about these two types in isolation we can usually make assumptions how the actual application looks.

1. When we think about the data in DOM, the application is either static without any dynamicity or it contains Javascript that manipulates the DOM directly (like JQuery for example). [In a recent talk ](http://jussi.hallila.com/modern-js/) I gave in my place of employment I rewarded this kind of application a bronze award

2. XHR driven data in web application usually means that the application is taking steps to becoming a single page application, or SPA. There is a high level of dynamicity and application interaction events are handled mostly by Javascript. Basically any JS framework is a suitable driver for this kind of application. For these kind of sites I usually refer to them as either Silver or Gold level applications.

3. If we combine these two types of data sources we are slowly getting towards the right direction. By loading the data (and rehydrating from) the DOM we achieve much better user experience on initial page loads, where we don't want to have spinners taking up most of the user's attention. By handling the data via XHR we achieve high levels of dynamicity and gain the ability to discuss with our server without disrupting the users flow state. This kind of data handling is one the building blocks to, what I like to call, a Platinum level web application.

### How do we achieve this in our current state of Java backend and JSP/Thymeleaf/whatever rendered views?

The initial state was discussed earlier in the [previous post about rehydration]({% post_url 2016-03-06-from-jsp-to-javascript-rehydration %}). We should now have our full initial load application state saved into JS variable. After this has been achieved we can start thinking of enhancing the data that we have available. This means starting another round of connections to the backend to retrieve additional data. Let's take a look at a Spring controller example to serve us that data.

Previously our controller looked like this:

{% highlight java %}
@Controller
@RequestMapping("/pizza")
public class PizzaController{

  public String getPizzaView(){
    // Returning view and pizza baked in
  }
}
{% endhighlight %}

This time we will add a method with a responsebody to serve additional data.

{% highlight java %}
@RequestMapping("/morePizzas")
@ResponseBody
public List<Pizza> getMorePizzas(){
    List<Pizza> returnable = new ArrayList<>();
    returnable.add(new Pizza("AnchovisAndAnanas"));
    returnable.add(new Pizza("ShroomsAndCorn"));
    return returnable;
  }
}
{% endhighlight %}

Excellent now we have the ability to make an XHR call to retrieve the additional data. Let's see a tiny implementation how that could be done.

{% highlight javascript %}

if(window.fetch) {
  fetch('/pizza/morePizzas', {method: 'GET'})
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      datastore.add(json);
    });
} else {
    // use some other XHR provider
}

{% endhighlight %}

Simple stuff really. The interesting part comes from our call to datastore.add() function where we pass in our retrieving collection of pizzas. This datastore will be the heart of our modern frontend application. It will contain all state for the individual user and will act as link between our different sources of data.

In the olden days most of the data was stored in the DOM which made it very hard to keep track what was coming from where. By externalizing this data store to a single source of truth we are more easily able to keep track of the state, no matter if it comes from the DOM on initial load, via XHR, from a user input or from localstorage or cookies. It provides a single set of interfaces that our application needs to interact with and keeps the state handling simple.

For now let's see how this store would look like in our very simple application:

{% highlight javascript %}

let data = [];

function add(newData){
  data.push(...newData);
}

function get(){
  return data;
}

{% endhighlight %}

Essentially a getter and a setter handling our one single array of all data. Add function takes in an array and pushes all elements to our global data store. Modifications of the data store will change the structure a little bit by introducing some injected logic to our store but we will leave insight of that to a later date.

One other thing good to note is that since we are now storing everything in a global variable we might introduce some clashes between our variables et cetera. That is why I think at this point it is good to take a look at modularisation of the frontend application and jump into a path to introduce a build process for our static resources.

We will touch those points in the next few posts.
