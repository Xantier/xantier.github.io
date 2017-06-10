Kotlin, the new lovechild of the JVM developers world. 

Google promoted Kotlin to be a first class language on its Java based Android platform and that has put the development world wondering what is this language. Kotlin has been around for a few years now and has been running on production systems for a year or so, after the languages 1.0 release in February 2016. The language has gathered a lot of praise and loving words from around the developer community. It is a breath of fresh air, a good upgrade to systems running older versions of Java and still somehow an old dog in the familiar playing field.

Kotlin is heavily influenced by Scala. A sentence that might scare some off you quite a bit. Scala is seen as a language that is at the same time intriguing and frightening. It introduces new paradigm to you while still mixing it into familiar object orientism (hence in most cases creating a mishmash of advanced techniques from both paradigms), brings in some new build tools and gives your internal flow state a frustrating break every now and the due to long compile times. 

I have bad news and good news for you:
Bad news is that Kotlin follows the same path

but luckily only a little bit of the way on every aspect. 

The functional programming paradigm is there within Kotlin as well. Luckily it doesn't go as far as higher-kinded types, monadic do-continuations or advanced type theory concepts that make you seek out [Bartosz Milewski and his brilliant book on Category Theory](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/). Kotlin introduces collection manipulation functions and functional pipelines for you and makes them easy to use. You will get your maps, filters and folds which *in most cases* are enough to get to the functional programming path. Java devs that have been lucky enough to jump into Java 8 (looking at you Android and/or enterprise developers) will be familiar with the basics of these and will feel right at home when jumping into Kotlin. They will also find the easiness of better type inference at the same time and that will spark the first crush towards the language. It's just so pretty and seamless to pipe these functions together and build a good clean pipeline. And after coming back to it few weeks later I still feel that I can somewhat understand it. Smiles all around.

When developing Kotlin your build processes are more or less the same as in your old Java application. You are already familiar with these, there is no need to learn anything new. The build process and build tools introduced with Kotlin can be described in two words; Gradle or Maven Plugin (we'll count either Gradle or Maven towards the two word limit, the *or* doesn't count). You can introduce the language to your codebase by adding the Kotlin plugin to your Gradle/Maven build script and making sure it points to the correct folder defining your Kotlin files. That means adding Kotlin to your code base just a quick Ctrl-C + Ctrl-V away ([Maven](https://kotlinlang.org/docs/reference/using-maven.html)/[Gradle](https://kotlinlang.org/docs/reference/using-gradle.html)). That is literally it, it will *just work*, kinda like Apple devices [1]. 

Oh, and it also clicks into place into your tooling seamlessly. Kotlin is made by Jetbrains the same people who created IntelliJ, *the best IDE the world has ever seen*, so the tooling better be spot on. And oh boy is it. IntelliJ nowadays comes bundled with a Kotlin plugin that gives you all the good stuff you have grown to expect when spitting out Java code. You will get brilliant intellisense, built in integration to build processes and smart suggestions how to make your code better all in a pretty and functional package. This help by tooling makes Kotlin a breeze to develop. That and the safety nets smartly built into language make certain that there is a lesser chance of blushing due to code quality when showing your 4-year-old codebase to your coworker/boss/OS community/spouse.

As a language Kotlin is very close to Java. This gives users few nice little perks. It means that the interoperability between those languages is brilliant, you can jump from one file to the next and change the language with zero problemos. Introducing Kotlin to your code base can be done incrementally because your old Java code can live side-by-side with your newer Kotlin code. Another perk we get because of close relations to Java is the whole compile process. Compiling Kotlin code to JVM bytecode does not take that long. I could even say that without measuring the timing you probably won't even notice it. [Folks from Keepsafe made a nice little test](https://medium.com/keepsafe-engineering/kotlin-vs-java-compilation-speed-e6c174b39b5d) with their Kotlin codebase versus Java. Their results say that Kotlin compile times are actually *faster* on incremental builds than Java compile times. Blazing fast![2] Not sad at all.

## Kotlin syntax

A great man once said *talk is cheap, show me the code*. So let's take a shallow dive to Kotlin.

To make all blog post gods happy we are required to start off with a simple hello world. In Kotlin it goes a little bit like this:

```
print("Hello World")
```

Now that we got that out of the way we can do some pseudoanalysis on that. The syntax seems familiar so let's assume parenthesis mean a function call. There is no semicolon to end the line which is neat. Oh, this `print` thing must print out something. That pretty much everything we can get out of this single line. 

Alright, now that the gods are happy we can start taking leaps forward.

### Variables

Variable declaration in Kotlin can happen in few different ways. We have keywords `val` and `var`. These two look similar but they have one big difference. *Values* declared with `val` are immutable (well, read-only), you can assign a value to the exactly once. That time comes when you are declaring and creating the value or when you are assigning a value to already declared but not created one. Variables with `var` are mutable and can be reassigned. The preferred way is to use `val`s everywhere possible. This way the codebase is easier to handle and easier for developer to reason about.

```
val hello: String = "hello"
val world: String
world = "world"

var helloWorld: String = "Hello"
helloWorld = "Hello World"
```

Notice how the type of the variable is after the name of the variable, separated by a colon. This has a good reason behind it. The compiler can now decide whether or not to *infer* the type. This means that Kotlin has more powerful type inference than Java. You can actually leave the type declaration out completely, the compiler will know what you meant.

```
val hell0 = "hi"
val w0rld = "earth"
```

Though only when the value, and therefore the type of the value, is known. 

### Funs

How about functions then? In Kotlin functions are always fun to write. It is guaranteed by the `fun` keyword that is used to declare them.

```
// No return type. (can also be --> fun sayIt (a: String): Unit)
fun sayIt (a: String) { 
    println(a)
}

// With return type
fun returnIt (b: String): String {
    return b
}

// With inferred return type
fun returnIt2 (c: String) =
    c
```

Type declaration follows the same pattern in here, It comes last. In our first, side-effectful, function we are not returning anything so we can omit the type which would be `Unit`. On the second we define that we must return a `String` and that we indeed do, using the trusty `return` keyword. Last one is a bit of a puzzler then. There is no curly brackets, just an equals sign. That means our `fun` is an *expression* and it will return automatically. When starting to build up functional pipelines there is a tendency to go towards these expressions more often than not. It is kinda a way to force our functions to do *one thing, and do it well*. Oh btw, the return type in *expressions* is optional and it can be omitted or left in place, whatever makes you happy (long expressions put it in, on shorter ones it can be omitted).

There are also neat little things like extension functions and infix functions as well as operator overloading in the language. These are interesting aspects of Kotlin and make writing the language more pleasant. They especially give us control freaks more opportunities to write *beautiful code* and *naturally readable structures*. That is a topic of another article though where we have more real estate to take deeper dive on these.


### Classes, Interfaces and Objects

Like Java, Kotlin as well has classes and interfaces. Unlike Java, these guys can all live in the same file and don't need their own for each instance. This decision made by the Kotlin team has made code organization more pleasant and builds in to the conciseness of the language. Let's tackle classes first. 

```
class SimpleClass

// Also --> class constructor SimpleClassWithConstructor(val prop: String)
class SimpleClassWithConstructor(val prop: String)

data class DataClass(val str: String, val num: Int)
```

In Kotlin we have a large handful of ways to create classes. The first example in the snippet is the reveals few things to us. Naming convention starts with a Capital letter. There are no curly braces. Also there is no modifier in this example. We still use the `class` keyword. In Kotlin we instantiate these classes the nearly same way as in Java but we omit the `new` keyword. Like this:

```
val simpleClass = SimpleClass()
```

No we have instantiated a class that we can do nothing with. Good job.

The second example is similar but it has a constructor as well. Notice how the constructor is bundled in to the same line as the class (you can leave the `constructor` keyword out in most cases, it needs to be added if the class has annotations or visibility modifiers). Another way to make Kotlin code more succinct. When we instantiate this class we need to pass in the value for `prop`. 

```
val smplClssWthCnstrctr = SimpleClassWithConstructor("Hello")
```

Now we have a litlle bit more useful class. This guy holds some data for us and that data is accessible. Properties in Kotlin are public by default so there is a simple way to access this property:

```
println(smplClssWthCnstrctr.prop)
```

Now this class  doesn't have any functionality, it is just a vessel for our data. We can add some functionality in there by defining `fun`s inside the class. In that case we do that we need to attach them curly braces as well.

```
class SimpleClassWithConstructor(val prop: String) {
    fun sayItMate(): String = prop + ", mate"
}
```

We can also attach *properties*, other *classes*, extra *constructors* or *initialization blocks* in there.


```
class Kenny(val celly: String) {
    val wheel: CanadianPerson
    val friend: String = "buddy"

    init{
        wheel = CanadianPerson("I'm not your")        
    }

    inner class CanadianPerson(val snipe: String)

    // The dollar sign makes use of string interpolation and replaces the $-prefixed propertyname with the string defined in that property.
    fun sayItCanadianWay(): String = "${wheel.snipe} $celly, $friend"
}
```

To get this to print out nicely we can call it like so:

```
val d = Kenny("friend")
print(d.sayItCanadianWay()) // I'm not your friend, buddy
```

When adding additional constructors to the class we need to make them call the original constructor. 

```
class DoubleTrouble(val str: String){
    constructor(strHolder: SimpleClassWithConstructor): this(strHolder.str)
}
```

Now that we have gone through classes with some functionality in them we can take a look at some simpler classes that do nothing other than hold our data.
For these kind of *data transfer objects* Kotlin has introduced a keyword to define them. The third example in the original class snipper (`data class ...`) is one of these guys. It differs from standard classes in few different ways. A `data class` has automatically generated `equals`, `hashcode`, `toString` and `copy` functions. First three of these are familiar for Java devs, the fourth one is a nice addition and helps us get similar objects from our data class. The `copy` function can be used to do that.

```
val daata = DataClass("Hello", 3)
val peeta = daata.copy(str = "Goodbye")
```

In this case our peeta object contains a `num` 3 and an `str` "Goodbye". Neat!

 We also get `component` functions to the data class for free. These component functions are a way to access the data within our data class via destructuring. This helps take individual properties from our data classes with a *succinct* one line call.

 ```
val (str, num) = peeta
 ```

With this trickery we have variables `str` and `num` and their values are "Goodbye" and 3 respectively. Note that the order of destructuring variables depends on the order of the properties in our data class, the names don't actually matter at all.

Another two top level structures are `interfaces` and `objects`. 

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

This is very similar to Java with one caveat. We can define an abstract value that can be overridden by the implementing class. Like in Java 8 Kotlin also has default implementations on interfaces. We can achieve the same thing with this interface.

```
interface Sayer {
    val value: String
    fun sayIt(): String {
        return "$value, world"
    }
}
```

Using this we don't have to override the function in our implementing class. Notice that the `override` keyword in mandatory in Kotlin. This helps us users of someone elses code appreciate the fact that the contract of the function/property comes from somewhere else than our implementation. Good way to pass responsibility ;)

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

What is this then? In Kotlin you can create singletons with `object` keyword. This is a nice pattern to store for example a larger context of your application in a single place. You could instantiate a bunch of complex classes and hold those objects in a place where they can be reached easily. You can access functions in objects by just calling their name directly.

```
SingletonClass.sayIt() // Hello world
```

The companion object is a little bit different beast. It is defined within a class, still a singleton, and it can be accessed using the *name of the wrapping class*.

```
CompaniedClass.sayIt()
```


That a short introduction to classes in Kotlin. There are a quite a bit of more that we can cover on classes but to keep this post short, we'll postpone `visibility modifiers`, `sealed classes`, `generics`, `enums` and others to the next post.


### Control flow (if, when , for)

Now that we have variables, function and classes nailed down with a decorated fluffy hammer we can take a short look at some control structures in Kotlin.

If statements in Kotlin work more or less as in Java. There is one big and important difference that is worthy to be pointed out.

```
val three = 4
if(three != 3) {
    println("Liar!")
} else{
    println("Good job")
}
```

That looks exactly the same as in Java. Suprise! It is. The next one is a bit more puzzling.

```
val three = 4
val goodOrNot = if(three != 3) {
    "Liar!"
} else{
    "Good job"
}
println(goodOrNot) // Liar!
```

If statements in Kotlin are actually expressions. They return the last value within their block so in this case the String value written in it. This brings in few caveats with it. Because you can use these `if`s the same way as ternary (the trusted `val thing = three > 4 ? "What?" : "Nowei!?"`) operators Kotlin guys have actually omitted ternary completely. Therefore, if you are trying to hunt that questionmark on your keyboard, don't. There is a whole different meaning for that character in Kotlin. We'll touch questionmarks at a later post.


If clauses' best friend `switch-case` has faced the same fate as ternary operator. It has been replaced by `when` statement in Kotlin.

```
when (three) {
    3 -> print("three is three")
    2 -> print("three is two?!?")
    else -> print("I don't know what's going on anymore")
}
```

As you can see `else` clause replaces the `default` case and arrow replaces `:` character. Keyword `break` is not needed anymore since when expression will stop when it hits the first true case. We can also wrap each of these cases with squiggly brackets and in those cases, just like in `if expression`, the last statement of the block will be returned. There are few interesting aspects of these `when` expressions. They can be evaluated by using any kind of expressions, many cases can be bundled in together and for numeric values you can use ranges to determine the clause.

```
when (three) {
    3 -> print("three is three")
    1,2 -> print("three is two or one?!?")
    in 4..10 -> print("What? Three can't be between 4 and 10!")
    else -> print("I don't know what's going on anymore")
}
```

We can also omit the parenthesis completely and squint really hard, because if we look from the correct angle we can make our when expressions replace if expressions completely.

```
val three = 4
val goodOrNot = when {
    three != 3 -> "Liar!"
    else -> "Good job"
}
println(goodOrNot) // Liar!
```


Hold up! You must be thinking. "What's that double dot in there that we skipped past completely?". That's a range expression in Kotlin, it's one of the building blocks for `for` statements in the language. Now, after a while for loops are not playing a really big part in the language since the collection extension functions make simple loops mostly useless. Let's skim through them regardless to wrap up this article.

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

That looks straight forward enough. In the first one we use magical `in` keyword to take a value from `range` that we defined with double-dot and assign that to `i`. Next loop adds a `step` keyword which indicates that we want to take every other value from the range. The third example loop takes values from a list (that we have created with a function call to `listOf`) and prints them out. That is more or less for-loops in Kotlin.


Those are the basic building blocks for you Kotlin language. With these you can get started writing Kotlin and play around with the language. We left out some essentials like lambdas, null-safety or types. We didn't touch collections yet either since those needs their own chapter and is better to touch on after lambdas. Hopefully you got a sense of the language and the basic syntax. Next article will ramp up the magic and expose more aspects that make Kotlin such a loved language amongst developers targeting JVM.



 [1]: Only in unison with other Apple devices (apart from the latest generation, which *just sometimes works*). Actually let's say it works better than Apple devices, because that describes the truth better. And Kotlin is also pretty, like Apple devices, yes. Let's say that Kotlin is pretty like Apple devices and *just works* like anything Linus has made. That's a much better analogy.

 [2]: Yes yes Go people, just remember we are still running on a JVM. Let's hope your dependency URLs stay online.