---
layout: post
title: Introduction to Kotlin - Generics, Delegates and Extension functions
teaser:
tags:
  - Kotlin
  - JVM
permalink:
header: no
---

> This article was originally published in [Codementor.io](https://www.codementor.io/jussihallila/introduction-to-kotlin-part-3-9p0k7ivqj)


Welcome back. In the last few articles, we went through Kotlin syntax basics, lambdas, null and type safety. We also touched on a few extension functions from the standard library. Check out [**Part 1**]({% post_url 2017-07-04-introduction-to-kotlin-part-1 %}) and [**Part 2**]({% post_url 2017-07-04-introduction-to-kotlin-part-2 %}) if you've missed them. Today we'll see more extension function magic and talk a little about generics and delegates. Finally, we'll wrap up this series with a short intro on visibility and packages.
 
## Extension Functions
 
So, we have been throwing around the term “extension function” in a few places. Kotlin language has the capability to extend any object with functions or properties, even if you don't have access to modify the codebase of that particular class. Extensions are a brilliant way to bring in extra functionality in a nicely context-bound way. Sometimes in Java codebase you might see a bunch of classes ending with the `Util` or `Utils` keyword. In Kotlin, extensions make those classes disappear.
 
```
fun String.uberized(): String = this + ", bro"
println("What's up".uberized()) // What's up, bro
```
 
In the example above, we have created an extension function to String class. Now that that extension is defined, it is available to be imported throughout the project. With this neat little functionality we can extend classes from libraries with all the needed functionality and make *wishy-washy collections of static 
utility functions obsolete*. Pretty neat, huh?
 
That String extension defined above is an example of the simplest use. We can also access the internals of our classes with these extensions, the same way we could with standard member functions.
 
```
data class Summer(var country: String, var sunny: Boolean)
fun Summer.isItSunny(): String = when {
        country == "Ireland" -> "Hah, nope. Of course not. :("
        sunny -> "Awww yiss. Shorts on! 8)"
        else -> "Nah, not really. It's warm though, because summer! 8)"
    }
 
var twentySeventeen = Summer("Ireland", true)
println(twentySeventeen.isItSunny()) // :(
```
 
There are a few other keywords that can be attached to our extension functions. We can add operators to our classes by using the `operator` keyword and we can create infix functions with the `infix` keyword. Operators have a defined list of functions that you can override; infix possibilities are endless.
 
```
operator fun Summer.inc(): Summer { // the `++` operator
    if(country == "Ireland") country = "Not Ireland"
    return this
}
 
twentySeventeen++
println(twentySeventeen.isItSunny()) // Awww yiss. Shorts on! 8)
 
infix fun Summer.holidayIn(country: String): Summer {
    this.country = country
    return this
}
 
twentySeventeen holidayIn "Myanmar"
println(twentySeventeen) // Summer(country=Myanmar, sunny=true))
```
 
With these little tricks, we can create simple classes and keep them doing their one thing, and doing it well. If there is a need to extend these classes, we don't necessarily have to start building a network of class hierarchies; we can simply add these bad boys in there.
 
On top of extension functions, Kotlin also offers the opportunity to create extension properties. That is, we can (in theory) extend individual fields in our classes! There are some things you need to know about extension properties. One is that to get their value, you need to define a `get()` function for them. Another one is that if you want to make them mutable and set their value, you have to define a `set()` function. Kotlin doesn't actually modify the class itself, so you cannot add an extension property with a backing field.
 
```
val Summer.temperature: Int
    get() = if(sunny) 25 else 15
 
println(twentySeventeen.temperature)
 
var Summer.icecream: Boolean
    get() = sunny
    set(yesno: Boolean) {
        this.sunny = yesno
    }
 
println("Should I get icecream? Heck ${twentySeventeen.icecream}") // Should I get icecream? Heck true
```
 
Keep in mind that, in Kotlin, `val` is read-only and has only a getter. `var`, on the other hand, can be reassigned and has both getter and setter.
 

## Higher order functions

When jumping head first into Kotlin code, you may think it odd at first. Especially when you’re coming from a Java world, it might seems strange that there is a distinct lack of classes and uppercase first letters in general. Kotlin leans more towards functional programming than Java and therefore its ability to feed in top level functions from everywhere shapes the language structure quite a bit. Higher order functions and the ease of creating them is another step in the direction of functional programming.

Higher order functions are functions that either take in another function as a parameter or return a function. HOFs are ever-present in functional programming, and Kotlin uses higher order functions extensively as well. The syntax for Kotlin to take in or return a function is *parentheses*, followed by an *arrow* and the *function return type*.

```
fun vacation(destination: String, intineraryAction: (String) -> Unit, itineraries: (String) -> List<String>) {
    print("We are going to $destination! And in there we will go to: ")
    itineraries(destination).forEach(intineraryAction)
}


val itineraryAction: (String) -> Unit = { it -> print("$it, ") }
vacation("Shanghai", itineraryAction) {
    when(it){
        "Shanghai" -> listOf("Oriental Pearl", "The Bund", "Qipu Lu")
        else       -> emptyList()
    }
} // We are going to Shanghai! And in there we will go to: Oriental Pearl, The Bund, Qipu Lu, 
```

In this example, we have a function `vacation` that takes in a `String` and two other functions. The first one of these functions will be of type `(String) -> Unit` so it takes a String parameter and returns a `Unit`, equivalent to `void` in Java. We create this function inline, assign it to a variable `itineraryAction` and pass it into our higher order `vacation` function. The second lambda argument to `vacation` is of type `(String) -> List<String>` and in this case we complete it with a lambda. Remember that, in Kotlin, if a function is the last argument to a function, we can close the braces (if it is the only argument, omit braces altogether) and write our lambda in a curly brace block. 

Kotlin also has this notion of *lambdas with receivers* or *higher order extension functions*. In practice, these monsters are *extension functions that are passed in or returned from a function*. With this kind of structure you get the ability to scope your passed-in lambdas and give them the context of the extended class. 

```
class Shape(val blue: String) {
    var shape: String = ""
    operator fun invoke(shape: String): Shape {
        this.shape = shape
        return this
    }
}

class Color(val fault: String) {
    fun shape(shape: Shape, function: Shape.() -> Unit) = shape.function()
}

fun your(thing: String, hoef: Color.() -> Unit) = Color(thing).hoef()

// Invoking
val `is` = Shape("Yellow")
your("Favourite") {
    shape(`is`("Triangle")) {
        println("Color of $shape is $blue and it's your $fault.")
    }
} // Color of Triangle is Yellow and it's your Favourite.
```

There's a little bit to cover here. First of all we have a couple classes, `Shape` and `Color` (or `Colour` maybe). Our `Shape` has properties, `blue` and `shape`. Then it has this funky *operator function* called `invoke`. This function is a Kotlin built-in and gives you the ability to *call an instantiated object* as if it were a function, essentially creating a function with empty character as its name. 

Our second class is a bit simpler; its constructor takes in a `fault` property and it has a single function. This function is one of these higher order extension functions. Its parameters are our previously defined `Shape` object and a function that extends a `Shape` class. The function itself does nothing besides calling our passed-in extension function *using the passed-in object as a receiver*. 

Additionally, we define a top level function called `your` that takes in a String and a function extending our `Color` class. 

When invoking this, you will notice that we are assigning our `Shape` into a keyword. In Kotlin, we can actually do this if we just remember to surround the keyword with backticks. After the assignment we dive into our miniature function waterfall. First we call `your` with a String and a lambda. This lambda calls the member function `shape` of the `Color` class. Since our lambda is an extension function of `Color` we have access to its properties and functions. 

Within the function call of `shape` we *invoke* our `is` object, thereby calling its `invoke` function. The implementation of invoke takes in a String, which we happily pass to it, and then returns itself, in this case our instantiated `is` object. Since the member function `shape` takes in two arguments, a String and a lambda, we need to pass the lambda in there as well. And that we do indeed. This final lambda does nothing but uses String interpolation and prints out our properties from those two classes `Shape` and `Color` that we are in context of.

For Groovy developers this is all groovy (hehe). For others, this introduces the notion of blocks. These blocks are tied together by higher order functions, higher order extensions functions and lambdas with receivers, and they provide a way to build an API that looks seamless to the user. These little tricks make Kotlin a wonderful language to create your own type safe DSLs. For a longer example of a DSL, you should check out [the example of a type safe HTML builder from Kotlin’s official website](https://kotlinlang.org/docs/reference/type-safe-builders.html).
 
 
## Type Parameters and Generics
 
At times we want to give our functions proper types and we know what they are doing; at times we have no idea, but we know that the types are the same; and at times we approximately know that the types are something similar/familiar but don't really know what they could be. These three cases are handled somewhat similarly in Kotlin and Java, though Kotlin's superior inference plays a big role here as well. 
 
Let's start off with a simple type parameterized class definition.
 
```
data class Drinksy<T>(val content: T)
```
 
In our `Drinksy` we have a type parameter that has a getter. We can use this to our advantage in few ways. We know what the return type of the getter is once we have created our class. Here there is nothing different from the Java world.
 
```
val stringyDrink: Drinksy<String> = Drinksy("Milk") // Or more labourious `Drinksy<String>("Milk")`
```
 
If we take this one step further, we can define a proper class for our content. With this we can safely know the type of our `content` property. If we do this we can then bound our generic type param in `Drinksy` so some fool doesn't make you drink lead.
 
```
interface Liquid
class Milk: Liquid
 
data class Drinksy<T: Liquid>(val content: T)
val milkyDrink: Drinksy<Milk> = Drinksy(Milk()) 
val smooth: Milk = milkyDrink.content
```
 
Now if we try to create our Drinksy with a milk String, we will not get anywhere because the compiler will stop us. This is nice and all, but what we are really talking about is standard type parameters; there is no magic here. What makes this interesting is that if you copy-paste our `Liquid` interface and our new `Drinksy` class to Intellij, you will get a suggestion squiggly line telling that our type param `T` only has `out variance`. IntelliJ suggests that we redefine our `Drinksy` class like this:
 
```
data class Drinksy<out T: Liquid>(val content: T)
```
 
That looks a bit weird, doesn't it? In the Java world we have few keywords when defining our bounded type variables. The words `super` and `extends` are used to define *contravariance* and *covariance* of the wildcarded (with `?` type param) generic types respectively. Kotlin makes our minds (and our fingers) do a little bit less work and defines these *variances* with the keywords `in` and `out`. The easiest way to think about these words is to take them as they are, `in`going typed parameter uses `in` keyword, `out`coming typed parameter uses the out keyword. In our previous example, we can't modify the content of Drinksy class to be a `var`, mutable property. If we would do that our `content` would be having an ingoing setter function as well and our `out` bounded type wouldn't line up anymore. This simple rule of thumb works similarly for functions as well.
 
What good is this in the real world, then? With these bounds we can do safe type trickery with our objects. Let's take our `out`ed Drinksy from above and try the following.
 
```
data class Drinksy<out T: Liquid>(val content: T)
val milkyDrink: Drinksy<Milk> = Drinksy(Milk())
val liquidDrink: Drinksy<Liquid> = milkyDrink
```
 
This works fine in Kotlin because the compiler knows that our `T` is `out`going. In Java we can kind of do the same thing:
 
```
class Drinksy<T extends Liquid>{
    private T content;
}
interface Liquid{}
interface Milk extends Liquid{}
 
final Drinksy<Milk> milkyDrink = new Drinksy<>();
final Drinksy<? extends Liquid> liquidDrink = milkyDrink;
```
 
There is a bit of a difference in our liquidDrinks between languages. In Kotlin the type is `Liquid` where in Java it is this monstrous `? extends Liquid`. If we would have tried to stick`Liquid` in there for the Java example we would have gotten a compile error. This is because in Kotlin we have *declaration site variance*, whereas in Java the same problem is solved by *use-site variance*. Kotlin knows from the itty-bitty `out` keyword in our *type declaration* that our Drinksy is safe to drink, it is still Liquid.
 
Again if we change our `content` in the Drinksy data class to be a `var` (and also removing the out keyword from the type definition) we will stumble upon a compiler error. Since we don't know that the bounded type is only outgoing, we can't assume that our other drink is only `Liquid`, it is precisely `Milk`. 
 
```
data class Drinksy<T: Liquid>(var content: T)
val milkyDrink: Drinksy<Milk> = Drinksy(Milk())
val otherDrink: Drinksy<Liquid> = milkyDrink
```
 
This will blow up in our face in compile time with an error `Type mismatch. Required: Drinksy<Liquid>, Found: Drinksy<Milk>`. In this case, Kotlin cannot assume the *variance* of our type and therefore does not allow it. 
 
Kotlin also has *use-site variance* similar to Java. On the use site we can use our already familiar `in` and `out` keywords. Use cases for this are when we have a class that has both *contra (`out`)*- and *covariant (`in`)* function types but we are, *at this site*, using only covariant for example.
 
```
data class Drinksy<T: Liquid>(var content: T)
data class Dronksy<T: Liquid>(var content: T, val anotherDrink: Drinksy<out T>)
fun <T: Liquid> Dronksy<T>.justTheOtherOne(): Drinksy<out T>{
    return anotherDrink
}
 
val milkyDrink: Dronksy<Milk> = Dronksy(Milk(), Drinksy(Milk()))
val compileErrorLiquid: Drinksy<Liquid> = milkyDrink.anotherDrink
val maybeLiquid: Drinksy<out Liquid> = milkyDrink.anotherDrink
val definitelyLiquid: Drinksy<out Liquid> = milkyDrink.justTheOtherOne()
```
 
Bounded types is a bit of a complicated subject and there are a lot of tricks involved when bounding your type parameters. Luckily for Kotliners, the IDE support for `in`, `out` and *invariant* (AKA neither `in` nor `out`) types is top notch and will guide you a lot of the way.
 
Kotlin also has `reified` generics which are implemented using a little bit of finesse. These are familiar to C# devs, but people from the Java world rarely see them. With `reified` generics you can make direct mentions to the type parameter of a function. Kotlin introduces these to `inline` functions, which essentially means functions that are copy-pasted to the location of all of the calls made towards them. These functions are good when you stumble upon performance issues due to large amount of lambdas and generated Java anonymous inner classes. They also give us reification.
 
 
```
class Rairai<T>
inline fun <reified T>whatsMyType(rai: Rairai<T>){
    println(T::class)
}
inline fun <reified T>doTheRai(str: Any) {
    if(str is T){
        println(str)
    } else {
        println("Not a String type")
    }
}
 
whatsMyType(Rairai<Int>()) // class kotlin.Int
doTheRai<String>("Hi") // Hi
```
 
In this example, we have a class with a single type parameter, then two top level inline functions that have a `reified` keyword in their type param info box. Our first function prints out the type of our reified type parameter. In our second, we can check if our passed-in object matches our reified type param. Both of these actions would be impossible without reification and the possibility to inline functions in Kotlin.
 
 
## Delegates 
 
A new thing that Kotlin brings with it is *delegation*. With Kotlin you can nonchalantly pass the puck to a different object without the need to implement anything yourself. The concept is best explained with an example. 
 
```
class Work
interface OrgMember{
    fun doWork(): Work
}
class MiddleManager(val subordinate: Employee): OrgMember by subordinate { 
    fun report(): String = "I did all the work"
}
class Employee: OrgMember {
    override fun doWork(): Work = Work()
}
```
 
In this snippet we create an interface that defines an Organization Member. This member has one job and one job only: to do some work. As is tradition, when the company has grown to a certain size we get middle management as well. In our example we define our `MiddleManager` as a class that takes one subordinate and use the magical `by` keyword to *delegate* the actual working part to our poor employee. Note that we can still define other functions within our delegating class, but the main thing, actually doing any work, is still part of the delegate’s job. This is a useful pattern especially to kill inheritance trees only to achieve code reuse.
 
Kotlin provides us with the possibility of using *delegated properties* as well. Delegated properties differ from class delegation a little bit by using a strongly defined contract on how they need to be implemented. At times you might have the same pattern to initialize a property in your class. These are good use cases for delegated properties. With the same `by` keyword you can add a block of code to your individual field that gets called when the property is accessed. You can do this for both class properties and local variables. 
 
```
class FourHourWorkWeekEmployee {
    val canYouDoThis: Boolean = true
    val workResult: Work by Outsourcing()
}
class Outsourcing {
    operator fun getValue(master: FourHourWorkWeekEmployee, property: KProperty<*>): Work {
        println("Yessir, I'll get this done.")
        return Work()
    }
}
val employee = FourHourWorkWeekEmployee()
val resut = employee.workResult // Yessir, I'll get this done.
```
 
Our `FourHourWorkWeekEmployee` is a smart and confident cookie. He knows he can do all types of work with this one simple trick (other employees hate him)! He contracts his own work via outsourcing to a worker that carries out the actual implementation. This `Outsourcing` class is called every time someone tries to access employee’s `workResult`. 
 
The contract for delegating is that for `val`s you need to define a `getValue` function that takes in two parameters, the *delegator class* and the *delegator property*. In our outsourcing example we locked down our outsourcer to work only for `FourHourWorkWeekEmployee` by changing the incoming parameter type for `master` to be a strict type. We could have made it `Any?` and that way anyone of our other classes could have outsourced their work. 
 
For `var`s We also need to define a `setValue` function in the delegatee. This function has a similar contract as getValue: it takes a third argument which is our set value or the property type and has a `Unit` return type. 
 
Kotlin provides few standard library delegates you can use to make your values smarter. Let's go through a few of those.
 
```
class Sloth {
    val timeToSleep: Boolean by lazy {
        println("Always")
        true
    }
}
```
 
Lazy<T> can be used to lazily initialize objects. `lazy` is a function that takes in a zero argument lambda and returns a delegate class that takes care of lazy initialization. The block above is called when our `timeToSleep` property is accessed for the first time. In subsequent accesses only the value `true` is returned. 
 
```
class NosyNeighbour {
    var shoppingTrip: Groceries by observable(Groceries()) { 
        property, previousGroceries: Groceries, newGroceries: Groceries ->
            println("Again he bought more craft beer. I believe he is a beer connoisseur, not an alcoholic.")
    }
}
```
 
Observable is another built-in delegate we can use in Kotlin. This is meant to be used with `var` properties, so it implements both `getValue` and `setValue`. For `getValue` there is not much of a story to tell for our offspring, because its' implementation only returns the value itself. `setValue`, on the other hand, is interesting. It takes in two arguments, an initial value and a lambda which is called with the property itself, the previous value of our property and the new value of our property. With `observable` we can easily do resource syncing or notification pushing to external sources.
 
 
```
fun Groceries.containsBeer(): Boolean = // implementation
class Wifey {
    var shoppingTrip: Groceries by vetoable(Groceries()) {
        property, previousGroceries: Groceries, newGroceries: Groceries ->
        !newGroceries.containsBeer()
    }
}
```
 
The next one we touch is the `vetoable` delegate. This can be used to *veto* the property value change. Its' `setValue` has the same incoming signature as `observable` and takes in the same initial value and a three argument lambda. Outgoing signature from `vetoable`s `setValue` is a `Boolean` which indicates whether or not to set the new value. In our case we may or may not give wife the veto right to define our `shoppingTrip`.
 
 
Delegates in Kotlin provide a nice and powerful way to assign common actions to properties and classes without the need to make extra class to external functions, and without the need to start building complex inheritance hierarchies.
 
## Namespaces, Modules, and Scoping
 
We'll wrap up this post by talking a little bit about scoping your applications. In Kotlin, you have packages the same way as in Java, and they are defined at the top of a file. The difference between Java packages is that you can actually omit the declaration and then your file and its contents are in "default" package. Another difference between Java and Kotlin is that we don't have to, nor should we, define one class per one file. 
 
Source files can contain top level classes or objects, functions or values. This means that you can have essentially *global* values defined in a file, or you can group your abstract functions in a single place. This possibility makes it much easier to reuse your codebase and make it succinct without the need for extra namespacing on the call site. If you definitely want namespacing for your functions, an object is a good candidate to wrap them with. That way you can namespace them with the object name and have a cohesive collection of functions in one place. In reality this is rarely needed, though.
 
Visibility modifiers work similarly to Java. We have `private`, `protected` and `public`. On top of those we have `internal` as well, which means that classes or functions marked with that are visible in the *same module* (Maven or Gradle module or IntelliJ module). All top level functions and classes marked with `private` are visible for the same file only, `protected` are visible to subclasses. Kotlin does not offer *package protected* (Java default) visibility at all, `internal` is the proposed solution to solve your needs for "*one public API*" cases. Modularity comes towards you hard in Kotlin, even if Java keeps pushing its modules to the future. Also one thing to note is that things in Kotlin are `public` by default.
 
 
That wraps up this introduction to Kotlin language.   

[**Introduction to Kotlin Part 1**]({% post_url 2017-07-04-introduction-to-kotlin-part-1 %}) covered basic syntax with variables, classes and functions.   

[**Part 2**]({% post_url 2017-07-04-introduction-to-kotlin-part-2 %}) touched a little bit on extensions and null safety as well as types.   

Finally, in **Part 3** we went through extension functions, higher order functions, generics and delegates. With these recipes you should be able to get nicely started with Kotlin and create your initial lines of code with the language. 
 
Remember, even though Kotlin was promoted to a first class language on Android, that doesn't mean that it is all Android driven. The language works really well for web applications as well, and interoperability with Spring makes it a very practical choice when choosing the stack for your next web project. 
 
Good luck and until next time!