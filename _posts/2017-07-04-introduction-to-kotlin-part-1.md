---
layout: post
title: Introduction to Kotlin - Syntax, Variables, Functions & Classes
teaser:
tags:
  - Kotlin
  - JVM
permalink:
header: no
---

> This article was originally published in [Codementor.io](https://www.codementor.io/jussihallila/introduction-to-kotlin-part-1-9mt0ony0g)

## Introduction to Kotlin
 
Kotlin is the new lovechild of the JVM developers' world. 
 
Google promoted Kotlin as a first class language on its Java-based Android platform [back in May](https://techcrunch.com/2017/05/17/google-makes-kotlin-a-first-class-language-for-writing-android-apps/). Since then, the whole development world has been wondering: what is this language? Kotlin has been around for a few years and has been running on production systems, after the languages 1.0 release in February 2016, for a year or so. The language has received a lot of praise and loving words from the developer community. It is a breath of fresh air, a good upgrade to systems running older versions of Java, and still somehow an old dog in a familiar playing field. 
 
 
In the next three tutorials, we will introduce you to the Kotlin language, starting from basics and making our way through the more difficult aspects of it. In this post, we will **cover the syntax and other basic building blocks** of the language. In [**Introduction to Kotlin Part 2**]({% post_url 2017-07-04-introduction-to-kotlin-part-2 %}), we will touch on **variables, functions, classes, interfaces, and objects**. Finally, in [**Part 3**]({% post_url 2017-07-04-introduction-to-kotlin-part-3 %}) we’ll look at a few examples about control flow in Kotlin.
 
## What is Kotlin? What does it bring that the JVM doesn't already have?
 
### Kotlin vs. Java
There are a few approaches we can take when introducing Kotlin. We can discuss it through  Java, the language Kotlin needs to be based on due to its JVM runtime, or we can do it through Scala, the language Kotlin is heavily influenced by. There is no doubt that Kotlin is better than Java. It is much safer and more concise. It provides you with a bunch of additions to your standard Java language and enhances a few bits and pieces that Java developers have grown to dislike. Additions include things like null safety, extension functions, data classes, objects, first class functions as well as extensive and expressive lambdas. Kotlin also enhances Java’s type inference and type system and takes massive leaps forward with collections.
 
### Kotlin vs. Scala
Perhaps, it’s better to compare Kotlin against Scala.  This comparison might scare some of you quite a bit because Scala has the reputation of being simultaneously intriguing and frightening. It heavily introduces functional programming paradigm to you while still mixing it into familiar object orientation (hence in an awfully lot of cases creating a mishmash of advanced techniques from both paradigms), brings in some new build tools, and gives your internal flow state a frustrating break every now and then due to long compile times. 
 
I come bearing both  good news and bad news. Let’s start with the bad news:
Bad news is that Kotlin is similar to Scala, it follows the same path as Scala does
 
The good news: luckily, it’s only slightly similar to Scala in every aspect. 
 
### Kotlin & Functional Programming Paradigm
 
The functional programming paradigm is big part of Kotlin as well. Luckily, it doesn't go into the higher-kinded types, monadic do-continuations, or advanced type theory concepts that make you seek out [Bartosz Milewski and his brilliant book on Category Theory](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/). Kotlin introduces easy-to-use collection manipulation functions and functional pipelines for you. You will get your maps, filters, and folds, which *in most cases* are enough to get to the functional programming path. 
 
Java devs that have been lucky enough to jump into Java 8 (hugs and kisses to you Android and/or enterprise developers) will be familiar with the these basics and will feel right at home when they jump into Kotlin. They will also find conciseness and safety of better type system, which will spark their first crush towards the language. It is just so pretty and seamless to pipe these functions together and build a clean pipeline. And when you come back to it after a few weeks, you’ll still feel like you can somewhat understand it. Smiles all around. :)
 
### Build Processes
When developing in Kotlin, your build processes will be  more or less the same as in your old Java application. Since you are already familiar with these, there is no need to learn anything new. The build process and build tools introduced by Kotlin can be described in two words:  Gradle/Maven Plugin.
You can introduce the language to your codebase by adding the Kotlin plugin to your Gradle/Maven build script and making sure it points to the correct folder that defines your Kotlin files —adding Kotlin to your code base is just a quick Ctrl-C + Ctrl-V away. More information on how to make this happen can be found from the official Kotlin documentation:  [Maven](https://kotlinlang.org/docs/reference/using-maven.html)/[Gradle](https://kotlinlang.org/docs/reference/using-gradle.html). That is literally it, it will just *miraculously work*, kinda like Apple devices [^1]. 
 
Oh, and Kotlin also clicks into place on top of your tooling seamlessly. Kotlin is made by JetBrains, the same people who created IntelliJ, *the best IDE the world has ever seen*, so the tooling better be spot on. And oh boy is it. IntelliJ nowadays comes bundled with a Kotlin plugin that gives you all the good stuff you expect to see when spitting out Java code. You will get brilliant intellisense, built in integration to build processes, and smart suggestions on how to make your code better — all wrapped up in a pretty and functional package. 
 
Naturally, you’d also have plugins for your favourite IDE, if IntelliJ is not your cup of tea. These tools make Kotlin a breeze to develop in. That and the safety nets smartly built into the language make certain that there is a lesser chance of blushing from bad code quality when you’re showing your 4-year-old codebase to your coworker/boss/OS community/spouse.
 
As a language, Kotlin is very close to Java. This gives users a few nice little perks. For example, the interoperability between Java and Kotlin is brilliant —you can jump from one file to the next and change the language with zero barriers. Introducing Kotlin to your code base can be done incrementally because your old Java code can live side-by-side with your newer Kotlin code. Another perk we get from not deviating too far from Java is the whole compile process. Compiling Kotlin code to JVM bytecode does not take that long. [Folks from Keepsafe made a nice little test](https://medium.com/keepsafe-engineering/kotlin-vs-java-compilation-speed-e6c174b39b5d) to compare their Kotlin codebase with Java. Their results show that Kotlin compile times are actually **faster** on incremental builds than Java compile times. Blazing fast![^2] Not sad at all.
 
## Kotlin syntax
 
A great man once said **talk is cheap, show me the code**. So let's take a shallow dive into Kotlin.
 
To make all blog post gods happy, we are going to start off with a simple hello world. In Kotlin, it goes a bit like this:
 
```
print("Hello World")
```
 
Now that we’ve got that out of the way, we can do some pseudo analysis on it. The syntax seems familiar so let's assume parenthesis means a function call. There is no semicolon to end the line, which is neat. Oh, this `print` thing must print out something. That’s pretty much everything we can get out of this single line. 
 
Alright, now that the blog gods are happy we can move forward.
 
### Kotlin Variables
 
Variable declaration in Kotlin can happen in a few different ways. We have keywords `val` and `var`. These two look similar but have one major difference: 
> *Values* declared with `val` are immutable (well, read-only) and you can only assign a value to them exactly one time. That time comes when you are declaring and creating the value or when you are assigning a value to already declared but not created one. *Variables* with `var` are mutable and can be reassigned. The preferred way is to use `val`s everywhere that is possible. This way the codebase will be easier to handle and reason about.
 
```
val hello: String = "hello"
val world: String
world = "world"
 
var helloWorld: String = "Hello"
helloWorld = "Hello World"
```
 
Notice how the type of the variable is defined after the variable, separated by a colon. There’s a good reason behind this. The compiler can now decide whether or not to **infer** the type, which means that Kotlin has a more powerful type inference than Java. You can actually leave the type declaration out completely and the compiler will know what you mean. 
 
```
val hell0 = "hi"
val w0rld = "earth"
```
 
This only works when the value, and therefore the type of the value, is known. 
 
### Funs, Funs, Funs
 
How about functions? It's always fun to write functions in Kotlin. Since we use the keyword `fun`to declare them, it’s bound to be fun! (ha ha. :( )
 
```
// No return type. (can also be --> fun sayIt (a: String): Unit)
fun sayIt (a: String) { 
    println(a)
}
 
// With return type
fun returnIt (returnable: String): String {
    return returnable
}
 
// As a `single-expression function with inferred return type and automatic return
fun returnIt2 (turntable: String) =
    turntable
```
 
Type declaration follows the same pattern here —it comes last. In our first, side-effectful, function, we are not returning anything so we can omit the type, which in this case would be `Unit`. In the second function, we defined that we must return a `String` and we did, using the trusty `return` keyword. Last one is a bit more puzzling. There are no curly brackets, just an equal sign. That means our `fun` is an **expression** and it will return automatically. 
 
When you’re just starting to build up functional pipelines, most people tend to lean towards these expressions. It is a way to force your functions to do **one thing, and do it well**. As you can see, the return type in **expressions** is optional and can be omitted or left in place, whatever makes you happy (rule of thumb: in long expressions, put it in, in shorter ones, it can be omitted).
 
Kotlin also introduces the concept of optional and named function parameters. This is useful especially  if your functions grow into a monster of a lot of same types and multiple different parameters. 
 
```
fun optFun(isItFun: Boolean = true, whyIsItFun: String = "Because") = if (isItFun) whyIsItFun else "It's not fun"
 
println(optFun()) // Because
println(optFun(false)) // It’s not fun
println(optFun(whyIsItFun = "It's Summer!")) // It's Summer!
```
 
In this snippet, we defined our function parameters with default values. When this is done, we can just call the function with zero, one, or both of its arguments. If arguments are omitted, then the default values kick in. As you can see, we can also call the function while naming the arguments. This gives us more insight into what we are calling with which value and possibility to target individual optional argument. Note that optional arguments work for both class constructors as well as functions.
 
There are also neat little things like extension functions and infix functions as well as operator overloading in the language. These are interesting aspects of Kotlin that make writing the language more pleasant. These functions give us control freaks more opportunities to write **beautiful code** and **naturally readable structures**. That is a [different topic for another article though](introduction-to-kotlin-part-3). 
 
### Classes, Interfaces, and Objects
 
Like Java, Kotlin has classes and interfaces. Unlike Java, Kotlin instances can all live in the same file and don't need their own. This decision made by the Kotlin team has made code organization more pleasant and language more concise. Let's tackle classes first. 
 
#### Classes
 
```
class SimpleClass
 
// Also --> class constructor SimpleClassWithConstructor(val chop: String)
class SimpleClassWithConstructor(val chop: String)
```
 
In Kotlin, there are a handful of ways to create classes. The first example in the snippet reveals a few things to us: 
Naming convention starts with a Capital letter
There are no curly braces
There is no visibility modifier in this example 
We still use the `class` keyword. 
 
In Kotlin we instantiate these classes nearly the same way as we do in Java, except, we omit the `new` keyword. Like this:
 
```
val simpleClass = SimpleClass()
```
 
We have now instantiated a class that we can do nothing with. Good job!
 
The second example is similar, but it has a constructor. Notice how the constructor is bundled into the same line as the class (you can leave the `constructor` keyword out in most cases, it only needs to be added if the class has annotations or visibility modifiers), another way to make Kotlin code more succinct. When we instantiate this class, we need to pass in the value for `chop`. 
 
```
val lamb = SimpleClassWithConstructor("Hello")
```
 
Properties in Kotlin are public by default, so there is a simple way to access this property:
 
```
println(lamb.chop)
```
 
This class doesn't have any functionality; it is just a vessel for our data. We can add some functionality in there by defining `fun`s inside the class. In this case, we need to attach those beautiful curly braces into our declaration.
 
```
class SimpleClassWithConstructor(val chop: String) {
    fun sayItMate(): String = chop + ", mate"
}
```
 
You can more or less dump the same things you would in Java to a class here. We can attach **properties**, other **classes**, extra **constructors** or **initialization blocks** in and we can assign visibility modifiers to all of them individually. 
 
`Init` blocks in Kotlin can be used to do things you would normally do with your Java constructor. If you want to create a class within a class, you can mark it with the `inner` keyword to be able to access members of the surrounding class.
 
 
```
class Kenny(val celly: String) {
    lateinit var wheel: CanadianPerson
    val friend: String
 
    init {
        friend = "buddy"
    }
    
    fun initializeWheel (wheeler: String) {
        wheel = CanadianPerson(wheeler)
    }
    
    inner class CanadianPerson(val snipe: String)
 
    // The dollar sign makes use of string interpolation and replaces the $-prefixed property name with toString implementation defined in that property.
    fun sayItCanadianWay(): String = "${wheel.snipe} $celly, $friend"
}
 
val d = Kenny("friend")
d.initializeWheel("I’m not")
print(d.sayItCanadianWay()) // I'm not your friend, buddy
```
 
Here, we have a few moving parts. By using the `lateinit` keyword, we can tell the compiler that this property is not null, even though we don't initialize it right away. This is useful for cases where we don't initialize our properties in the constructor but use, for example, a dependency injection framework to assign values to them. Note that our `lateinit` property is mutable  — this is a must. 
 
`init` is equivalent to the constructor block in Java classes. In there, we can perform needed actions when we instantiate the class. In this case, we assign a String to our property, something that could be done as a joined assignment as well. 
 
Next, we have a function that finally assigns a value to our `lateinit` property, instantiating an inner class `CanadianPerson`. This inner class is just a vessel to our data once again. 
 
Finally, we’ll have a function that we invoke: this function will return a String, which it parsed together using **string interpolation**. The dollar sign character can be used in Strings to replace the $-prefixed property name with its toString implementation, defined in that property.
 
 
When adding additional constructors to the class, we need to make them call the original constructor. 
 
```
class DoubleTrouble(val str: String){
    constructor(lamb: SimpleClassWithConstructor): this(lamb.chop)
}
```
 
 
#### Data classes
 
Now that we have gone through classes with some functionality in them, we can take a look at some simpler classes that do nothing other than hold our data.
 
For these kind of **data transfer objects**, Kotlin has introduced a keyword to define them: `data class`. It differs from standard classes in a few ways. A `data class` automatically generates `equals`, `hashcode`, `toString` and `copy` functions. The first three of these are familiar for Java devs, the fourth one is a nice addition that helps us create similar objects from our read-only data class. The `copy` function can be used to do that.
 
```
data class DataClass(val str: String, val num: Int)
val daata = DataClass("Hello", 3)
val peeta = daata.copy(str = "Goodbye")
```
 
In this case, our peeta object contains a `num` 3 and an `str` "Goodbye". Neat!
 
We also get `component` functions to the data class for free. These component functions are a way to access the data within our data class via destructuring. This helps take individual properties from our data classes with a *succinct* one line call.
 
```
val (str, num) = peeta
```
 
With this trick, we have variables `str` and `num` and their values are "Goodbye" and 3 respectively. Note that the order of destructuring variables depends on the order of the properties in our data class; the names don't actually matter at all.
 
Two other top level structures are `interfaces` and `objects`. 
 
 
#### Interfaces
 
Interfaces in Kotlin don't differ that much from the Java world. One nice thing is that you can have abstract properties in your interfaces as well. These properties need to be initialized in the implementing class to honor the contract of the interface.
 
```
interface Sayer {
    val value: String
    fun sayIt(): String
}
 
class SayerClass: Sayer{
    override val value: String = "Hello"
    override fun sayIt(): String = "$value, world"
}
 
println(SayerClass().sayIt()) // Hello, world
```
 
As you can see, this is very similar to Java. Like Java 8, Kotlin also can have default implementations in interfaces. We can achieve the same thing shown above with this interface.
 
```
interface Sayer {
    val value: String
    fun sayIt(): String {
        return "$value, world"
    }
}
```
 
Using this, we don't have to override the function in our implementing class. Notice that the `override` keyword is mandatory in Kotlin. This helps us, users of someone else's’ code, appreciate the fact that the contract of the function/property comes from somewhere outside of  our implementation. Good way to dodge  responsibility XD
 
 
#### Objects
 
```
object SingletonClass{
    fun sayIt(): String = "Hello world"
}
 
class CompaniedClass(val str: String){
    companion object Printer{
        fun sayIt(): String = "Hello world"
    }
}
 
```
 
What is this then? In Kotlin, you can create singletons with `object` keyword. This is a nice pattern to store, for example, a larger context of your application in a single place. You could instantiate a bunch of complex classes and hold those objects in a place where they can be accessed easily. You can access functions in objects by calling their names directly.
 
```
SingletonClass.sayIt() // Hello world
```
 
The companion object is a slightly different beast. It is defined within a class, which is still a singleton, and it can be accessed using the **name of the wrapping class**.
 
```
CompaniedClass.sayIt() // Hello world
```
 
 
That's a short introduction to classes in Kotlin. There are quite a bit more we can discuss on classes, but to keep this post short, we'll postpone `visibility modifiers`, `sealed classes`, `generics`, and others for a future post.
 
 
### Control flow (if, when, and for)
 
Now that we have variables, functions, and classes nailed down with a decorated fluffy hammer, we can take a short look at some control structures in Kotlin.
 
#### If
 
If statements in Kotlin work more or less the same way as in Java. There is one big and important difference that is worthy to be pointed out:
 
```
val three = 4
if (three != 3) {
    println("Liar!")
} else{
    println("Good job")
}
```
 
This looks exactly the same as in Java. Suprise! It is! The next one is a bit more puzzling.
 
```
val three = 4
val goodOrNot = if(three != 3) {
    "Liar!"
} else{
    "Good job"
}
println(goodOrNot) // Liar!
```
 
If statements in Kotlin are actually expressions. They return the last value within their block, so in this case, the String value written in it. This brings a few caveats with it. Because you can use these `if`s the same way as ternary (the trusted `val thing = three > 4 ? "What?" : "Nowei!?"`) operators, Kotlin guys have actually omitted ternary completely. Therefore, if you are trying to hunt that question mark on your keyboard, don't. There is a whole different meaning to that symbol in Kotlin. We'll touch on question marks in the next post.
 
#### When
 
If clauses' best friend `switch-case` has the same fate as ternary operator. It has been replaced by `when` statement in Kotlin.
 
```
when (three) {
    3 -> print("three is three")
    2 -> print("three is two?!?")
    else -> print("I don't know what's going on anymore")
}
```
 
As you can see `else` clause replaced the `default` case, and arrow replaced the `:` character. Keyword `break` is not needed anymore since `when` expression will stop when it hits the first true case. We can also wrap each of these cases with squiggly brackets — in those cases, just like in `if expression`, the last statement of the block will be returned. There are a few interesting aspects of these `when` expressions. They can be evaluated using any kind of expressions, many cases can be bundled together and for numeric values, you can use ranges to determine the clause.
 
```
when (three) {
    3 -> print("three is three")
    1,2 -> print("three is two or one?!?")
    in 4..10 -> print("What? Three can't be between 4 and 10!")
    else -> print("I don't know what's going on anymore")
}
```
 
We can also omit the parenthesis and the passed in value from our `when` completely and squint really hard. If we look from the correct angle, we can make our when expressions look like `if`s and subsequently replace them completely.
 
```
val three = 4
val goodOrNot = when {
    three != 3 -> "Liar!"
    else -> "Good job"
}
println(goodOrNot) // Liar!
```
 
#### For
 
Hold up! You must be thinking. "What's that double dot in there that we skipped past completely?". That's a range expression in Kotlin, it's one of the building blocks for `for` statements in the language. Now, after a while (not the loop [hehe]), for loops won’t play a big part in the language since the collection extension functions make simple loops in many cases useless. Let's skim through them regardless to wrap up this article.
 
```
for (i in 1..10) {
    print(i)
} // 12345678910
 
for (i in 1..10 step 2) {
    print(i)
} // 13579
 
val lst = listOf(1,2,3)
for (i in lst){
    print(i)
} // 123
```
 
That looks straight forward enough. In the first one, we used the magical `in` keyword to take a value from `range` that we defined with double-dot and assigned that to `i`. Next loop adds a `step` keyword which indicates that we want to take every other value from the range. The third example loop takes values from a list (that we have created with a function call to `listOf`) and prints them out. That is more or less for-loops in Kotlin.
 
Those are the basic building blocks for the Kotlin language. With these, you can start to write and play around with the language. We left out some essentials like lambdas, null-safety, and types. We didn't touch on collections yet either since they need their own chapter and is better to touch on after we’ve covered lambdas. Hopefully by the end of this post, you now have an idea about Kotlin and its basic syntax. In the next article, we will ramp up the magic and expose more aspects that make Kotlin such a loved language amongst developers targeting JVM.
 
Don't forget to check out the other posts from this series. In [**Introduction to Kotlin Part 2**](https://www.codementor.io/jussihallila/introduction-to-kotlin-part-2-9oybmr9rb), I will introduce you to null safety, lambdas, collections, and types as well as few handy utility functions in Kotlin language.
 
In [**Part 3**](https://www.codementor.io/jussihallila/introduction-to-kotlin-part-3-9p0k7ivqj), we will wrap up the introduction with extension functions, higher order functions, and functional style, and finally introduce you to generics and delegates.
 
 
 [^1]: Only in unison with other Apple devices (apart from the latest generation, which *sometimes works*). Actually, let's say it works better than Apple devices, because that’s closer to truth. And Kotlin is also pretty, like Apple devices, yes. Let's say that Kotlin is pretty like Apple devices and *just works* like anything Linus has made. That's a much better analogy.
 
 [^2]: Yes, with an asterisk naturally. And yes yes Go people it is not the fastest in the universe, just remember we are still running on a JVM. Let's hope your dependency URLs stay online.
 
