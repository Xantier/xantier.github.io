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

Even though we can't go fully isomorphic with our Java backend, we are able to make use of variables in our expression language. Because of this we naturallu also have the option to pass data to the frontend application seamlessly on our initial render.


/***

How to do this?
Controller passing decoded JSON and view
JSP variables and undecoding
Rehydrating in JS.
Deleting data from view.

***/
