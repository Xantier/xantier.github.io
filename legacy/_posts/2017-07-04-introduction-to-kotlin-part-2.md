---
layout: post
title: Introduction to Kotlin - Collections, Lambdas, Null Safety & Types
teaser:
tags:
  - Kotlin
  - JVM
permalink:
header: no
---

> This article was originally published in [Codementor.io](https://www.codementor.io/jussihallila/introduction-to-kotlin-part-2-9oybmr9rb)


In [**Introduction to Kotlin: Part 1**]({% post_url 2017-07-04-introduction-to-kotlin-part-1 %}), we covered basic syntax, and now we can start to look at the aspects that actually make Kotlin so loved. In this post, we will cover collections and lambdas, a few handy extension functions (`apply`, `let`, `run` & `with`), null safety, and we’ll touch a little bit on types. We'll cover a lot of ground in this post, so come prepared. If you want to jump straight to generics, delegates and extension functions, check out [**Introduction to Kotlin: Part 3**]({% post_url 2017-07-04-introduction-to-kotlin-part-3 %}).
 
 
## Kotlin Collections and Lambdas
 
One of the most interesting parts of Kotlin is its collection library and the methods provided with that. Things you need to know about this beast are twofold: on the right side is the "immutable" side, on the left side are mutable collections. Kotlin is very adamant to tell you that there is a difference, and there is. Like the Kotlin language in general, collections lean heavily on the immutable side. This makes functional programming patterns particularly useful, if not essential to your programming style. Immutability also gives you some leeway and reduces your cognitive load around parallelism and concurrency, something we won't be touching in this post[^1]. 
 
What are Kotlin collections then? If you are familiar with Java 8 (again sorry to you Android and corporate devs :( ) you will be quite knowledgeable about these collection methods (Java streams) and idioms as well. Kotlin, though, takes it one step further and provides extensions for most things you can think of (and few that you can't). Let's take a closer look.
 
```
listOf(1,2,3)
mutableListOf("a", "b", "c")
 
setOf(1,2,3)
mutableSetOf("a", "b", "c")
 
mapOf(1 to "a", 2 to "b", 3 to "c")
mutableMapOf("a" to 1, "b" to 2, "c" to 3)
```
 
Those are the basics. Kotlin offers you helper methods to create collections. I've listed both immutable and mutable versions of `List`, `Set` and `Map` here. Note that the `to` in our map declarations is actually an `infix function` and not a keyword [^2]. The real power of Kotlin collections, in addition to their default immutability, comes from the extension functions in the Kotlin *stdlib*. If you are familiar with functional programming, you will be familiar with most of these functions. They are a bunch of helper functions and *higher order functions* that provide commonly done operations to your collections. With these extension functions we get all the usual suspects like `map`, `flatMap`, `forEach`, `fold`, `reduce`, `filter`, `zip` and many many more.
 
Before we can use those, though, we need to talk about one important thing in Kotlin: lambdas. The beauty of the Kotlin standard library's collection extension functions comes from the easy to use lambdas that are enhanced with *just enough* type inference to keep the programmer safe. In Kotlin there are few ways to define a lambda function.
 
```
val aList = listOf(1,2,4)
aList.map { elem ->
    elem + 1
} // 2,3,5
 
aList.filter { it != 1} // 2,4
 
fun folder(a: Int, b: Int) = a + b
aList.reduce(::folder) // 7
// also: aList.reduce { a, b -> folder(a, b) }
```
 
In the first example, we define probably the most common use of Kotlin lambdas. We can shorthand the anonymous function with angle brackets. We can also choose the name of the argument coming into our lambda (we have omitted the type definition in here; we can see from `aList` list that it is an `Int`), in this case `elem`. And then we define the body of our lambda. No need for a return statement, the last line will be returned.
 
The next example takes it one step further and omits even the argument definition. In Kotlin, by default one argument lambdas will receive the argument named as `it`. That makes sense because we know we are working on `it`; no need to name things. Note that overuse of *itism*, especially in nested functions, leads to very messy code. In simple one-off cases or continuation cases, that is all fine and dandy. In more complex scenarios it is better to tread lightly.
 
The last one introduces a few new concepts to us. First is a local function[^3] that we reference with a *doublecolon* syntax, familiar to us from Java 8 (though there is no need to mess this beauty up with `static` keywords or Class names). The local function looks and acts very similarly to class or global scoped function but as an addition it also has access to variables defined in the same scope as the function itself. The second way to reference our local function is to just simply call it within our lambda, as is displayed in the commented-out section.
 
As you can see, lambdas in Kotlin are defined in a straightforward manner. They are very noticeable in your code base as well and make the usage of higher order functions a breeze. The best part about Kotlin and lambdas is the type inference which will give you a red sguiggly line under your code when the types don't line up. With this help from the compiler you can focus your energy on the actual business logic rather than trying to figure out how many times a loop should be traversed.
 
More information about Kotlin collection extension functions can be found on the [official website API doc](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/index.html#functions), or you can take a shortcut and check out the handy [cheat sheet here](http://jussi.hallila.com/Kollections). There are simply too many collection extension functions to mention in an introductory post. 
 
## Null safety
 
If you *surf* to the Jetbrains website about Kotlin you will see how they advertise the "Null safety" of Kotlin as one of the main headlines. What does this actually mean? 
 
In Kotlin you have absolute null safety for your Kotlin code and relative null safety to other JVM code that you interoperate with. The Kotlin compiler is very strict in dissecting the code you have written when it comes to nullability. If you define a variable that might be null you *need* to define it as *nullable*. This Kotlin compiler can figure out if you are able to make a naive call using your variable or if you need to make a null check of it. How does this work in practice?
 
```
var nil: String? = null
val notNil: String = "Hi"
var nil = null
```
 
These three variable declarations have two nullables and one not-null. The common denominator for nullables is the *question mark*; nullable variables and function arguments are defined with the question mark, not-nulls without it. This question mark plays an important role in Kotlin “null safe” code. If the Kotlin compiler sees this question mark either in a variable declaration or in a function argument/return type, it will force you to do a null check on it. If you are writing predominantly Kotlin code, you are *smartly steered away from nullable code*. However, Kotlin is highly interoperable with Java, so when you are touching the Java world you will have to assume that some data passed around might be null. Kotlin provides a few helpers to deal with this [*billion dollar mistake*.](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare)
 
```
data class Lad(val name: String, val age: Int)
fun doSomething(laddy: Lad?){
    print(laddy.name)
}
```
 
If you try to do this you will see how the Kotlin compiler will moan about it. In IntelliJ you will get a red squiggly line under the text. It will shout `Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type Lad?`. To get around this you have few options.
 
```
 
fun doSomething(laddy: Lad?){
    if(laddy != null){
        print(laddy.name)
    }
}
 
fun doSomething(laddy: Lad?){
    print(laddy?.name)
}
 
fun doSomething(laddy: Lad?){
    laddy?.name?.let {
        print(it)
    }
    /** Or
    * laddy?.name?.let { name ->
    *     print(name)
    * }
    **/
}
 
```
 
The first example is the old, trusted not-null check. We know this is a *good boye* and have been using it in other languages all over the place. The compiler knows that after the null check is done we can use our variable, so the squiggly line will be gone from the print statement. In the second example we get to see some magic. The already familiar question mark is there again, but this time in a different role. In this context the question mark says `If laddy is not null, then take the name property from it`. If laddy is null, then `null` will be printed into the console. 
 
The third function introduces a new kind of extension function we can use for this, called `let`. We'll return to that in a few minutes, but first we'll wrap up null safety and take a look at the beautifully named `elvis operator`. If we want to return something from our function, we can use elvis as a default value in case we bump into a null. Using elvis goes a little bit like this:
 
```
fun doSomething(laddy: Lad?) = laddy?.name?: "James"
```
 
As you can see, we use the *safe call operator* for both `laddy` and its `name`. In case the latter of these two fellows is `null`, we'll return "James"; in case the former one is `null` we'll still return "James," because we will never actually reach the `name` property access attempt. Only if both of them are non-null will we return the name. This makes sense because that's really the only way we can safely return the actual name. We used this same kind of double safety in that mysterious `let` function which was shown few lines up in the previous code block. Now we can take a closer look at that and its compatriots as well.
 
## Extension functions: Apply, Let, Run, and With
 
Kotlin introduces a few extension functions that help us scope our application and calls. The first one we saw already; `let` is an extension that takes one parameter, a lambda, into it. Scroll up few mouse wheelies and take another look at the code example. The only thing `let` does is call the lambda we have passed into it and use `this` as that lambda’s only parameter. The `it` in this case means the `name` property of our object, but only if both `laddy` and `name` are non-null. `let` operates only on values that exist; being an extension it cannot extend something that doesn't exist!
 
`Apply` is another funky extension function that we can use in many cases. One common usage for this handy fellow is to create an object that needs many calls after each other but doesn't have good capabilities to do it. For simplicity’s sake we can think of Java beans and their getter and setters for example. Warning, Java code ahead!
 
```
public class JavaBeanClass {
   private String thing;
   private String thang;
 
   public String getThing() {           
       return thing;                    
   }                                    
                                        
   public void setThing(String thing) { 
       this.thing = thing;              
   }                                    
                                        
   public String getThang() {           
       return thang;                    
   }                                    
                                        
   public void setThang(String thang) { 
       this.thang = thang;              
   }                                    
}
```
 
Ugh, that looks a bit ugly and verbose doesn't it? Let's run with `it` (haha) regardless. We'll jump back to the Kotlin side.
 
```
val mrBean = JavaBeanClass().apply {
    setThing("Wild")
    setThang("erbeest")
}
```
 
Excellent, much more comfortable already. See how we can call the setter methods within our apply function. Our `mrBean` is now a fully populated object with `wild` and `erbeest` within it. In Kotlin, you actually receive some extra magic for your setter and getter as well. They are treated as properties when coming from Java and the same code as above can be written like this:
 
```
val mrBean = JavaBeanClass().apply {
    thing = "Wild"
    thang = "erbeest"
}
```
 
Much nicer and more concise. Apply has many useful functions, but this is the one I like the most. It takes in a lambda function which it calls and then returns `this`, which is the original object. The value of `this` within apply is therefore the object it was called upon.
 
Next up, we have `with`. This guy is similar to `apply`, with a small caveat. It is actually not an extension function, just a function that takes **two** parameters and is used to scope the context of an object. The use of `with` is a little bit frowned upon because it makes somewhat unreadable code at times. Let's look at an example regardless. We'll use the same `mrBean` we defined earlier.
 
```
with(mrBean) {
    thing = "the"
    thang = "ain't no"
}
```
[^4]  
Very similar to `apply`, don’t you think? No, not at all! We kinda cheated on this because we didn’t do anything with the return value. *`with` returns the value of the last expression within the `with` block*. This is an important distinction so let's see a better example.
 
```
val yo = with(mrBean) {
    thang + "thing"
}
print(yo) // ain't nothing
```
 
Sneaky, isn't it?
 
We'll keep marching on to `run`.
 
This function called `run` is a very simple little thing. It is an extension function that takes in one parameter, a lambda. It just calls that lambda and returns the response from that lambda. “What use is this guy, then?” you might ask. I did too. When I'm thinking of `run` I see two use cases. Using it to run something if and only if the object it's called on is not null (using it similarly as `let` few lines above, but in `run`s case `this` as the scoped object) or using it to scope our function calls and safeguard our lambdas. We have to remember that `run` does the same thing as `with` but is usually easier to follow since we are calling it to a guaranteed non-null object and we tend to be more aware of that object’s scope.
 
## Types: Checking, casting, aliasing, and safety
 
In the Java world you might have stumbled across `if` checks like `if (clazz instanceOf SomeClass)` where the programmer has wanted to see if they are working on the correct implementation of their interface or extended base class. You might have also seen a lot of parentheses when a transition from one more generic class has been casted to a more specific one. This seems to happen a lot in the boundaries of the application, be it database access, API calls or incoming JSON. Kotlin is similar to Java in many ways and this is (sort of) one of them as well. There might be a need to cast and check your types to see that you are working with the correct implementation. Luckily, Kotlin provides some helpers around it and gives us an opportunity to make these checks in a safe way. Let's take a short look at what we can do without getting too much into type theory.
 
Type inference in Kotlin is very good, and the compiler gives a lot of useful hints and tips while you are writing code. When you have the need to check if an object is of some type you can use `is` keyword.
 
```
fun tryAndFailToCompileToGetTheAnswer(plzPassInThirteen: Any): Int {
    return plzPassInThirteen + 29
}
 
fun getTheAnswer(plzPassInThirteen: Any): Int {
    if (plzPassInThirteen is Int) {
        return plzPassInThirteen + 29
    }
    return 666
}
println(getTheAnswer(13)) // 42
```
 
In the above block, the first function will fail miserably and doesn't actually compile at all. It will moan to you that it can't find a `plus` function that matches the types. The second function fixes that: it does a simple `is` check and at that point Kotlin *smart casts* the value to an Int so it is usable within the if statement. Usually you will probably stumble more upon `when` statement when it comes to `is` checks, like so:
 
```
fun getTheAnswer(plzPassInThirteen: Any): Int = when(plzPassInThirteen) {
    is Int -> plzPassInThirteen + 29
    else -> 666
}
println(getTheAnswer(13)) // 42
```
 
This example is identical to the  previously seen if statement but doesn't it read much more beautifully? 
 
Now that we have touched `is` and `when` together we can take a small detour and talk about `sealed classes`. Kotlin has a notion of a `sealed class` that we can think of as a wrapper of some subclasses. 
 
```
sealed class Seal
class SeaLion: Seal()
class Walrus: Seal()
class KissFromARose(val film: String): Seal()
```
 
If we have this kind of construct, a sealed superclass and three children that extend it we can nicely handle our polymorphic cases with a combination of `when` and `is`. 
 
```
fun getTheAnswer(songOrAnimal: Seal): Unit = when(songOrAnimal) {
    is SeaLion -> println("Animal")
    is Walrus -> println("Song by Beatles")
}
```
 
Our new and modified `getTheAnswer` function does not compile. We will get a sguiggly line under our `when` telling us that a `when expression must be exhaustive`. It will even tell us which subclass we are missing from our `when` statement. If we add our `KissFromARose` in there, all *will be grand*, like the Irish say. We also get the added benefit of not needing to add an else clause in there; Kotlin already knows we have covered all the cases.
 
```
fun getTheAnswer(songOrAnimal: Seal): Unit = when(songOrAnimal) {
    is SeaLion -> println("Animal")
    is Walrus -> println("Song by Beatles")
    is KissFromARose -> ("Heidi Klum")
}
println(getTheAnswer(Walrus())) // Song by Beatles
```
 
The above compiles nicely and gives us a peace of mind at night when we go through the codebase in our subconscious mind. It is good practice to omit the `else` line when possible if you are using sealed classes. This way every new subclass will make your compilation fail fast. 
 
At times, we also need to do some casting of types. In Kotlin this is done with the `as` keyword. When that is appended to a value, we can assume that it is casted to that type. This little functionality also has some niceties built into it. In the Java world you might have gotten used to assigning a new variable for the casted object, but fear not, in Kotlin there is no need for that. When the `as` has been thrown around once, the compiler knows that our variable is casted to something else. There is no need for any more huffing and puffing around it.
 
```
val possiblyString: Any = "definitely"
possiblyString.capitalize()
```
 
Again the example above will fail to compile. `capitalize()` is underlined squiggly and the compiler tells us that there is an `Unresolved reference` and `resolver type mismatch`. That makes perfect sense since we know that `Any` does not have `capitalize()` function. The fix for this is easy-peasy. We cast our variable to a String and magically our capitalization works like a charm.
 
```
val possiblyString: Any = "definitely"
possiblyString as String
possiblyString.capitalize()
```
 
Smart casts in Kotlin are done nicely and will help you along the way, especially in cases where you stumble upon a lot of Generics, Object orientation and deep inheritance hierarchies. If you are lucky to not see these kind of lines in your codebase, I am a little bit of jealous of you.
 
 
The last thing about types in Kotlin is the type alias. Sometimes, especially when you get a complex function type, type declarations grow into massive proportions. Type aliases can be used to shorten a function type or some generic type with multiple type parameters. Aliases don't go as far as checking the actual implementation, they are just synonyms to the underlying type. Kotlin doesn't quite have `newtype` like Haskell does, but type aliases are some of the way there. Using Kotlin and type aliases, we still might stumble upon a [Mars Climate Orbiter disaster](https://github.com/mdgriffith/mechanical-elephant-hakyll/blob/master/thoughts/2015-08-10-the-pratical-benefits-of-haskell-typesystem.markdown). 
 
```
typealias Miles = Int
typealias Kilometres = Int
 
fun calculateWithProperValues(first: Kilometres, second: Kilometres): Unit {
    println("lol miles. Next you'll probably be talking about feet and pounds.")
}
 
val one: Miles = 2
val two: Kilometres = 1
calculateWithProperValues(one,two)
```
 
This is valid code in Kotlin; it compiles and runs nicely. So, in this case our typealias doesn't actually offer much extra benefit for us. The real benefit of type aliases comes in cases like this:
 
```
typealias LoL<K> = List<List<K>>
typealias ComplexFunction<T,K> = (list: List<T>, map: Map<T, K>) -> LoL<K>
 
val thing: ComplexFunction<String, Int> = {list, map -> list.map { listOf(map.getValue(it)) }}
fun doSomethingWithListOfLists(fn: ComplexFunction<String, Int>, list: List<String>, map: Map<String, Int>): LoL<Int> = fn(list, map)
```
 
That guy is still long, but at least it's a little bit shorter than when typing in the full lambda signature and return value. When using type aliases, you can easily go a bit overboard and lose the underlying types of your functions. When used properly and with good forethought, type aliases will give you a nice and readable type signature for your APIs.
 
We've now touched on collections, null safety, and type safety in Kotlin. This brings us to the end of **Introduction to Kotlin Part 2**.

[**Introduction to Kotlin Part 1**]({% post_url 2017-07-04-introduction-to-kotlin-part-1 %}), where we introduced syntax, variables, functions, and classes, can be found here. 

There are still a few topics to discuss, namely generics and delegates, extension functions and functional style with higher order functions, as well as Kotlin's beautiful capability to create typesafe DSLs. Those will be covered in **[Part 3]({% post_url 2017-07-04-introduction-to-kotlin-part-3 %})**. Now it is time to jump back into the IDE and continue coding away.
 
[^1]: Because regardless of all the helpers it is still a difficult topic.
 
[^2]: An infix function in Kotlin is a function that takes one parameter and is a member function or an extension function. In Kotlin `1.to(2)` can be rewritten like `1 to 2` where `to` is an extension function in the `Pair` class. In Kotlin maps take a collection of `Pair`s as their items. Yes, in theory you can write a whole application without the need to touch the `.` character at all! (Though where's the fun with that, since IntelliJ can nearly read your mind and autocomplete everything.)
 
[^3]: Yes, in Kotlin you can define function anywhere, even within other functions. This comes very handy when you are building complex *closure structures* and want to keep your functions in order by naming them well.
 
[^4]: The function call looks a bit funky when you remember that it takes two params. In Kotlin, if the second (well, last) argument is a function, we can close the parentheses and make the lambda look like it is outside of them. It is still the same function we are calling and the lambda is still the second parameter we are passing in. This makes Kotlin a brilliant language to do DSLs since we can create these kind of blocks of code very easily. 
