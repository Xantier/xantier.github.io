---
layout: page
title: Java webapps and modern frontend: From JSP to Javascript dehydration
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

# From JSP to Javascript dehydration

This is the second post on the series explaining a journey from fully server rendered web page towards modern frontend application. The introduction to the series can be found from [here]({% post_url 2016-02-21-java-webapps-and-modern-web %})

Or how I learned to hate spinners and embrace server rendered data.

We all know that dreadful moment between server response for your initial request and before the browser displays our content. This moment of waiting can be even longer if we are moving towards Single Page Applications and load our content via AJAX. There are few nice and widely used solutions to tackle this. One of them is spinners. Today though I'm not going to discuss that, I'm will write about a concept that I realized from my exploration within the Node.js world and [building isomorphic/universal JS applications using React and Node.js](http://www.github.com/Xantier/nerd-stack).

This neat little trick is at times called rehydration and, [as one brilliant stack overflow answer explains it](http://stackoverflow.com/a/33790716), is easiest to understand with a gif from Back To The Future 2.

![Rehydration](http://i.stack.imgur.com/YvHXB.gif)

In Java world we usually let our server handle this rehydration directly to HTML. In spring for example when you write your JSP view and use expression language, the server inserts your POJO field values directly to the HTML. An example of this would be the following simple example:


Your object:
{% highlight java %}
public class Pizza{
  private final String type;

  /* constructor & getter omitted */
}
{% endhighlight %}

Your Spring controller:
{% highlight java %}
@Controller
@RequestMapping("/pizza")
public class PizzaController{

  public String getPizzaView(){
    return new ModelAndView("views/pizza", "pizza", new Pizza("BaconAndKebab"));
  }
}
{% endhighlight %}


And finally, your view:
{% highlight jsp %}
<head>
<title>Rehydrate!</title>
</head>
<body>
	<p>
  I love when my pizza's type is ${pizza.type}!!!
  </p>
</body>
</html>
{% endhighlight %}

Here Spring/JSP does magic for you and rehydrates the type String from your POJO to the rendered HTML. Simple enough and similar variables are available on other view/template engines as well.

This is all fine and dandy but isn't this kind of server side rendered content non-dynamic and very much coupled to the DOM?
It is indeed and if we want to start moving towards a more modern web application we need to get our data into Javascript. That way we can hand the control of our application to the browser and let our frontend application do its job.

The normal way to do this is to jump into a SPA world head-on and flip your controllers to be restful. This way you will handle all requests and data passing between back- and frontend with XHR calls. This is also the way to get the opportunity to put nice little spinners and loading bars to your page to entertain the user while the data fetching takes place.

Another way to tackle this issue came to my attention from rise of React and isomorphic JS applications. When creating an isomorphic application you use the same Javascript codebase to handle both server and client rendering. For this to work properly and for the data to keep up to date on both sides of the application, you need to be able to pass the data back and forth between your backend and frontend. The initial passing from back to front was done via the server rendered HTML and grabbed by the frontend application from there.

Even though we can't go fully isomorphic with our Java backend, we are able to make use of variables in our expression language. Because of this we naturally also have the option to pass data to the frontend application seamlessly on our initial render.

Let's see how this could work:

First our controller. Simple enough solution, we are still returning a model with our view. This time though we transform our model into a JSON string. First we create a Jackson ObjectMapper who we will use to serialize our Pizza object. We will also just in case escape the string, to do that we use Apache Commons library's StringEscapeUtils.

{% highlight java %}

@Controller
@RequestMapping("/pizza")
public class PizzaController{

  public String getPizzaView(){
    Pizza pizza = new Pizza("BaconAndKebab");

    ObjectMapper objectMapper = new ObjectMapper();
    String json = null;
    try {
        json = objectMapper.writeValueAsString(pizza);
    } catch (JsonProcessingException e) {
        logger.info("Unable to convert object to json.", e);
    }
    return new ModelAndView("views/pizza", "pizza", StringEscapeUtils.escapeJson(json));
  }
}
{% endhighlight %}

On frontend side we need to catch that serialized string and somehow map that into a JS variable. Let's take a look how that could work:

{% highlight jsp %}

<head>
<title>Rehydrate!</title>
</head>
<script>
  ___pizza___ = JSON.parse('${pizza}');
</script>
<body>
<div id="content">
  <!-- Content will be rendered here by JS-->
</div>
</body>
</html>

{% endhighlight %}

Nicely done. Now we have a global JS object called ___pizza___ that contains our wanted data. Last step to make our client a bit cleaner is to remove the global object and save to a model.

{% highlight javascript %}

var data = window.___pizza___;
delete window.___pizza___;
saveToModel(data);

{% endhighlight %}

That's pretty much it. We have injected a dump of data to the DOM and prevented the need to add a spinner to the page. Now that data is in our model and ready to be used in our modern frontend application.

Next time we'll take a look at how we are able to do that.
