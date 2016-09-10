---
layout: post
title: Reading YAML config files with Kotlin
teaser:
tags:
  - Kotlin
  - Yml
permalink:
header: no
---

Lately I've been making the transition towards Kotlin due to the likability factor of the language. It really makes development on the JVM more pleasant and seamless interoperability with all existing Java libraries makes it a brilliant language to jump into. I will probably be touching more interesting Kotlin subjects in the future but let's start with a tiny display of this language and how to load configuration files with it.

For our purposes JSON and YAML files are used as configuration formats. These don't in the end differ too much from each other so the process of handling them is the same for both of them. For ingesting them we will use Jackson from FasterXML which is probably familiar to most Java developers who have ever seen JSON. Below is a simple function that reads a yaml file from the filesystem and binds individual properties from it to Google Guice constants to be ready for dependency injection.

{% highlight kotlin linenos=table %}
private fun bindProperties(file) {
  val yaml = Yaml()
  fun prefixKeys(key: String, value: Map<*, *>): Map<String, *> {
      return value.mapKeys { key + "." + it.key.toString() }
  }
  Files.newInputStream(Paths.get(file)).use({ `in` ->
      val config = yaml.loadAs(`in`, Properties::class.java)
      config.forEach { str, property ->
          fun mapProps(key: String, value: Any) {
              when (value) {
                  is Map<*, *> -> prefixKeys(key, value).forEach { mapProps(it.key, it.value!!) }
                  else -> bindConstant().annotatedWith(Names.named(key)).to(value.toString())
              }
          }
          mapProps(str.toString(), property)
      }
  })
}
{% endhighlight %}


With this function we'll read a YAML file like the following:

{% highlight yaml linenos=table %}
version: 1.0
released: 2016-09-10

database:
  jdbcUrl: jdbc:postgresql://localhost:5432/hallila
  username: postgres
  password: postgres
{% endhighlight %}

Let's go through this line by line.
First we'll introduce a private function that takes in our configuration file location. The we introduce an immutable object Yaml from package `com.fasterxml.jackson.dataformat.yaml.snakeyaml`. Since functions are first class citizens we create a small helper function inside our main one. This guy prefixes our property keys with dots if they happen to be nested properties. This is the case for example in our database properties. We want the output from this to be `database.jdbcUrl` instead of a flat `jdbcUrl`.

Next we can see the actual loading of the file using standard Files.newInputStream from `java.nio`. We chain that inputStream to an inline function called `use` that Kotlin has introduced for us. This helper takes in a function to handle the inputStream and automatically closes the stream when handling is done. Our handling function takes in one param called `in`, which is the stream itself. We pass this stream into the previously constructed Yaml loader and tell the loader to load it in as a Properties type of object. Properties is more or less just a glorified HashTable so we could use a map or anything else as well. If our YAML file would be constructed nicely we could obviously pass it directly into a data class with a matching constructor.

Now that we have our function constructed we can map it into our Guice context. We want these guys to be available to be injected throughout our application so we will bind them to constant values. In this example we loop through the loaded properties file line by line using standard forEach. Within that we create a function and immediately invoke it. This function uses Kotlin `when` expression to check what type of value we have. If our value is a map, we call previously mentioned `prefixKeys` function and recursively call our mapping function with those prefixed keys. In other cases we bind the key-value pair to a Guice constant.

This is a very simple example of few bits on Kotlin lang but it will get the flow rolling on this language. From my few months experience I can fully recommend Kotlin, especially if you are already on JVM land. The interoperability is truly amazing with Java and IntelliJ support for the language is excellent.
