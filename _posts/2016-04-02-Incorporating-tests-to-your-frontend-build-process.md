---
layout: page
title: Java webapps and modern frontend - Incorporating Tests To Your Frontend Build Process
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

Last week we went through the basics of introducing build process to your frontend  resources. Now I believe it's time to discuss about much overlooked aspect of frontend development in enterprisy organizations.

Tests. That much overlooked aspect of frontend development. It seems that most of the time it is easier to make your changes and click through them than actually write the tests and let them tell your if your code is working as designed.

### Babel and Mocha tests

I will quickly show you how to set up Mocha and Babel compilation as part of your test toolkit. The line on package.json that achieves this is:
{% highlight javascript %}
    "test": "./node_modules/.bin/mocha --reporter spec --compilers js:babel-core/register './test/**/*.js' "
{% endhighlight %}

Now when I have node.js installed on my machine and I have also installed Mocha and babel-core as dependencies on my my application I can start passing all my Mocha tests through Babel compiler before running them. This gives me the ability to write my tests in ES6 syntax. To run this I naturally just type ```npm test```.

### Babel and Mocha tests with coverage (Istanbul)

Another nice little entry on my package.json is usually a test coverage reporter. For this we can use the same tactic, passing everything through babel before running it. For coverage I like to use Istanbul because that gives a nice selection of layout and output options. I can easily integrate it with my Jenkins and Sonar instances which are reporting my test successes, failures and coverage. NPM script for this looks like the follo following:

{% highlight javascript %}
"test-cov": "./node_modules/.bin/babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- -R spec './test/**/*.js'"
{% endhighlight %}

We need to have a babel-istanbul installed for our project so we can use that to run our coverage report. Another important thing to note here is that we are running our Mocha tests with _mocha runner, that is with underscore, instead of the default one.

### Continuously running Mocha tests

The third part of my package.json usually contains a test watcher. This gives me the ability to quickly iterate and drive my development via tests. This little snippet will keep an eye on my test source files and re-run the tests every time something changes. The script is very similar to the first one, actually the only thing changing is the additional parameter to mark that we want to 'watch' our test files.

{% highlight javascript %}
"test": "./node_modules/.bin/mocha --reporter spec --compilers js:babel-core/register --watch './test/**/*.js' "
{% endhighlight %}

That is pretty much everything on tests and how to include them in your frontend build process. Tests itself are a topic for another blog post but with these NPM scripts you should be able to get started on test driving your frontend code.
