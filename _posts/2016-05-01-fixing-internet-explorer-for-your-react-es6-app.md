---
layout: page
title: Fixing Internet Explorer for Your React ES6 Application
teaser:
tags:
  - Javascript
  - React
  - IE
permalink:
header: no
---

# Fixing Internet Explorer for Your React ES6 Application

## Polyfilling missing features from IE JS interpreter

Sometimes we have the luxury to work with other than nicely working evergreen browsers. That means that if we ride the wave of modern frontend application we usually need to make some detours while developing. At times Internet Explorer will work nicely with most features of current Javascript but more often than not there might need to do some trickery to keep those browser features up to date. A good place to check when a polyfill is needed is to check [kangax's compatibility table.](https://kangax.github.io/compat-table/es6/)

By the way, in case you are running an operating system that is not provided by Microsoft you will probably run into a problem when trying to find Internet Explorer in the first place. To get a Windows and IE up and running easily I suggest to spin up a virtual box using vagrant. Github user andreptb has collected [instructions](https://gist.github.com/andreptb/57e388df5e881937e62a) to get this set up in a jiffy.

The problem we are facing usually comes up when users are running older versions of Windows. We need to take our hats off to Microsoft's browser team when it comes to their new browser Microsoft Edge. That runs most newer features smoothly and without any hiccups. The only downside is, that it unfortunately works only on Windows 10. So there will be few years before all MS users have migrated to that.

Now if take a look at the compat table from IE 11 we can clearly see that nearly the whole column is red. We can get most of the features covered   [by introducing babel to your frontend build process.]({% post_url 2016-03-28-introducing-a-build-process-for-your-frontend-resources %}) There are few hiccups though that might creep up if you only include Babel and ES-2015 preset to your configurations. Babel handles arrow functions, classes and other syntactic changes very well and we can trust them to work well across browsers. One thing it does fall short is built-in new features on existing items. These include often used methods like ```Object.assign``` and ```Array.find/includes```.

This naturally causes a problem we want to solve. The solution for this comes very easily. I opt in to include ```core-js``` package to my vendor bundle to introduce these polyfills to all pages. This can simply be done with few commands.

First we install the package itself with npm:
* ```npm install core-js```

And then we add it to the bundled vendor artifact on our webpack configuration:
```
/* snip */
entry: {
  bundle: './app/index.js',
  vendor: ['core-js', 'react']
},
/* snip */
```

Now we have polyfills for needed prototype methods in our application and we can sleep more easily when thinking about users with their Internet Explorer surfing habits.

## Forcing IE to bust caches on AJAX get requests

Another bad habit Internet Explorers tend to do is to very aggressively cache frontend contents when they are loaded. Do not get me wrong, this is perfectly acceptable and even encouraged for JS files, CSS files and images. One thing though where you do not want that to happen is when you retrieve data from the backend via an XHR.

IE retrieves the first the content for the first time very nicely by requesting it from the backend. Subsequent times are more tricky. Firefox and Chrome call the backend for every request, like good citizens do. Internet Explorer opts to use the cached data instead. This evidently causes problems when application state is modified in the backend and then requested again from the frontend via XHR. FF and Chrome fetch the modified data, Internet Explorer displays the data that it has cached.

There are few different approaches that we can take on this. I will list one for backend, one for frontend and one that would introduce change on both sides. `

1. Boundary solution: Changing your GET to be a POST
  * The hackiest solution. POST requests are never cached in any of the browsers and will work every time
  * Changing requests from GET doesn't really play well with standards and also introduces a very minor performance hit :(

2. Frontend solution: Adding cache buster to your request
  * Cache buster is a request parameter on your XHR request that differentiates your current request from the previous one. Using this the browser is tricked to think that it is requesting completely different dataset than previously when it tried to do the GET request to the same url
  * Append a random date to your GET url. With superagent for example:

    ```
    superagent.get('/things')
    .query({ query: 'somequery' })
    .query({ cachebuster: Date.now().toString() })
    .end(function(err, res){
       // handle response
    });
      ```
  * Simple solution to implement if your XHRs go through a single service
  * Another frontend solution is to add headers to your request that tell we don't want caching to happen (this might or might not work for IE every time.):

    ```
    /* snip (superagent) */
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Expires', '-1')
    .set('If-Modified-Since', 'Thu, 13 Feb 1985 13:40:01 GMT')
    .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
    /* snip */
    ```

3. Backend solution (Spring): Adding interceptor to add caching information to headers
  * Similar to frontend solution but this time we tell on the response from server how caching should happen
  * This can be done easily in XML configuration in your webapp context (don't cache calls to '/api' path, exclude '/static', etc. however your paths are configured):

  ```
  /* snip */
    <mvc:interceptor>
        <mvc:mapping path="/api/**"/>
        <mvc:exclude-mapping path="/static/**"/>
        <bean id="webContentInterceptor" class="org.springframework.web.servlet.mvc.WebContentInterceptor">
            <property name="cacheSeconds" value="0"/>
            <property name="useExpiresHeader" value="true"/>
            <property name="useCacheControlHeader" value="true"/>
            <property name="useCacheControlNoStore" value="true"/>
        </bean>
    </mvc:interceptor>
  /* snip */
  ```

I tend to think that cache busting on the frontend is the most reliable of these methods so I would go towards that if there is a chance to do it.

Luckily it's only few more years and we should be able to say final goodbyes to IE family, even in enterprise environments.
