---
layout: page
title: Faster development workflow with your IDE
teaser:
tags:
  - IDE
  - IntelliJ
  - Eclipse
permalink:
header: no
---

One neat thing about modern IDEs with a local server setup is the ability to hot swap your code changes to already running application. This is especially useful for web development where we sometimes stumble upon stringly typed params etc. small changes that makes it such a frustrating process to rebuild-restart server-redeploy application.

With hot swapping we can make code changes inside methods (not change signature or make new classes) in debug mode and hot swap our changes to the running application without the need to go through rebuilding-redeploying. This'll save us a minute or two on every backend code change while developing and prevents build process from disturbing our flow state.

I tend to usually add a webserver to the Maven file for easy out of the box running. This gives you the ability to start the server easily with zero configuration immediately after you have pulled the project down from source control. Usually this server is Jetty, if you are injecting tomcat via maven, change everything that says Jetty below to actually be Tomcat.
Below are short instructions how we can achieve IDE based hotswapping functionality in our IntelliJs/Eclipses.

## Eclipse
* Download tomcat
* Eclipse --> servers --> add new server
* Configure your installed tomcat
   * Add your war file (eg. myApp-web) to the server

On servers tab double click servers to configure it:
1. Set up your http port to match what it was in Jetty as well under "Ports"
2. Enable "Automatically publish when resources change" under "Publishing"
3. Go to "Modules" tab and edit your web module, set path to what it used to be
4. Disable auto reload for the web module

* Create run/Debug configuration for this:
   * Select previously setup server.
   * Set up environment variables on run config if applicable:
* See property environment variables of the project from web.xml or other location where those are set up in your project eg.

{% highlight xml %}
 <context-param>
  <param-name>myEnvParam</param-name>
  <param-value>MyProperties</param-value>
</context-param>
{% endhighlight %}

* setup value to point to your properties file location --> ~/props/myApp.properties. Or alternatively set up system wide env variable.

Start debugging and enjoy hot swapping.

## IntelliJ

* Download Tomcat
* Create new Run/Debug Configuration --> Tomcat Server (Local)
* Set up http port to match your app
* On deployment tab add your war file to be deployed (set application contect to be the same as before)
* Set up environment variables on run config if applicable:
* See property environment variables of the project from web.xml or other location where those are set up in your project eg.

{% highlight xml %}
 <context-param>
  <param-name>myEnvParam</param-name>
  <param-value>MyProperties</param-value>
</context-param>
{% endhighlight %}

* setup value to point to your properties file location --> ~/props/myApp.properties. Or alternatively set up system wide env variable.

Click debug, enjoy hot swapping (keyboard shortcut to deploy Ctrl+10)
