---
layout: post
title: Annotation Free Spring configuration - With Kotlin
tags:
  - Kotlin
  - JVM
  - Spring
header: no
---

As we Spring fans are very aware the release date of next major Spring version, this time number 5, has passed a long time ago (at the time of this post, 3 days ago) and most of the applications should be updated to the new version already. Now we can focus on waiting the Spring Boot version 2 release which should be following Spring 5 in the coming months. The important bits of this major release were new `WebFlux` reactive framework core and everything introduced with that. We are also got the ability to create functional route definitions as well as functionally register our Spring beans. Of course on top of these we got first class support for everyones favourite programming language, Kotlin.

In this post we will focus on Kotlin way to functionally register beans in a spring Boot 2 application. We'll see the way to inject our beans functionally as well as a way to use Kotlin extension functions to our advantage to define *annotation free Spring beans*. 

Usually Spring Boot applicaiton starts with a `SpringBootApplication` annotation and in our case this is no different. In Kotlin application you would create a single marker class with that annotation and then a separate main function in the same file. This way we are able to isolate our Spring annotations to be in our marker class. We also gain the possibility to start excplicitly defining all of the beans within our context, gaining somewhat easier understanding what we actually have available.

```kotlin
@SpringBootApplication
class Config

fun main(args: Array<String>) {
    val application = SpringApplication(Config::class.java)
    /* 
    * Register our beans
    */
    application.run(*args)
}
```

With this setup we would get our application up and running and start developing. In standard annotation driven Spring app we would start defining `@Controller`s, `@Service`s or other `@Component`s by creating a class and adding the respective annotation to mark that class to be a possible *autowirecandidate*. 

Let's try to see if we are able to remove `@Controller` annotations from our web app. Firstly, of course, we have to define that our Spring application is Reactive, whether or not it actually benefits us in this particular application (we could, for example, be using a [gasp] relational database and stuck with *JDBC* to give us only blocking access to our datasource :( )[^1]. With that settled we have decided to run the wave of reactivity and build a *Webflux* Spring application with functional routes:

```kotlin
fun firstRoutes(): RouterFunction<ServerResponse> = 
  routes {
    /**
    * Our route definitions
    **/
  }
```

Of course we are using Sebastien Deleuzes brilliant `routes` DSL to define our routes. We might want to wrap that individual *route provider function* into an object to namespace it but that is not necessarily really needed. Now how do we register this functional bean to our application context? The easy way out would be to stick `@Bean` on top of the function defition (and register an encompassing class as a component to the Spring context). For the purpose of this post though we of course want to take the functional, annotation-free, way to register this bean:

```kotlin
fun main(args: Array<String>) {
    val application = SpringApplication(Config::class.java)
    application.addInitializers(ApplicationContextInitializer<GenericApplicationContext> { ctx ->
        beans {
            bean { firstRoutes() }
        }.initialize(ctx)
    })
    application.run(*args)
}
```

Again we are using a Kotlin DSL to add our bean to the application context. This time the DSL entrypoint is `beans` function that will provide us the context to register individual beans. We can either use the lambda style where we can construct our actual bean implementation manually or the type argument style registration where we will let Spring construct our bean. Let's think a bit what kind of elements we could be introducing with that kind of registration pattern. The most obvious subject would be our handlers, whether it is a `req`-`res` handler defined to help route handling or interceptor type handler like `ExceptionHandler`. Another bean that would use this type of registration would be a *filter* which for example could handle our CORS allowances. Handler of course in its simplicity would look somewhat like this:

```kotlin
class ApiHandler {

    fun handle(req: ServerRequest): Mono<ServerResponse> =
     /**
     * Do some handling
     **/ 
```

A handler with no dependencies... With this we gain the ability to print out a `hello world` or do some arithmetic, maybe we can pull some deps from a global context just to obscure implementations a little bit. Regardless of what we do with our handler the registration of a single class bean is simple with the new functional bean registration:

```kotlin
beans {
    bean<ApiHandler>()
    bean { firstRoutes() }
}.initialize(ctx)
```

This simple one-liner is all we need to register this bean. Kotlin's *reified type parameter* will take care of telling Spring to instantiate and register the correct class to our application context. With these two beans in our context we of course start to long for a connection between them two. The usual route for our webflux application data flow is from router to a handler and back. Therefore our router function would need to have that injected handler bean as an injected dependency. Since our router in the end is just a simple function the injection would happen via function argument:

```kotlin
fun firstRoutes(apiHandler: ApiHandler): RouterFunction<ServerResponse> = 
  routes {
    /**
    * Our route definitions and request passing to ApiHandler 
    **/
  }
```

With that kind of function parameter the compiler would shout out at us and tell that something needs to be passed in when we call the function while registering our bean. Kotlin and reification comes to our help on this case again:
```kotlin
beans {
    bean<ApiHandler>()
    bean { firstRoutes(ref()) }
}.initialize(ctx)
```

That little `ref()` call will retrieve us the correct bean from Spring context using the information it is gathering from Kotlin's type system. 

How about injecting into our Handler then? Let's imagine we have added `hibernate-validator` into our classpath and want to inject that into our Handler, like this:

```
import javax.validation.Validator
class ApiHandler(private val validator: Validator) {
     /**
     * Do some handling
     **/ 
```

The changes to our functional bean registration are minimal or non-existent. In this case, no changes are needed. 

Alright, examples like these would probably cover a lot of canonical microservice applications where the bean count is fairly minimal and all application code lives within close proximity of each other. Of course at times we are actually building something that does not want to communicate over the network or as Martin Fowler mentions we are taking the correct approach and building a monolith first. In the land of microservices the man with a single deployment target is king. How does that then play together with our journey towards annotation free Spring?

```
compile(project(":component"))
```

Let's say we have few of these lines in our boundary module that is actually the "main" module and exposes itself to the outside world. Of course our components want to define their own Spring configs, at times talking to the database, other times discussing with some external service. All this needs beans defined in our Spring application. In these cases there are two bean types that usually come in to mind when discussing about components somewhat deeper down application stack. These bean are `@Service` or, in case of database access, `@Repository` annotations in the old annotationly-defined Spring project.

Creating an annotation free *service* or *repository* is simple since we can use the same pattern as we are using when creating a handler. Of course for the optimal world of development the path takes few detours since we wan't to only expose the actual boundaries of our *inner module* and keep the implementations hidden. In either case the solution is fairly straighforward. If we have the following classes/interfaces:

```
internal interface ComponentRepository: CrudRepository<OurEntityClass, Long>

interface ComponentService{
    fun someOverridable: String
}
internal ComponentServiceImpl(private val repository: ComponentRepository): ComponentService{
    override fun someOverridable: String {
        // implementation
    }
}
```

This of course gives us the ability to build a monolithic Spring application *the correct way*. Kotlin and its internal keyword is an *ok* substitute to Java's package protected empty modifier, I wish just that there would be a way to make internal the default visibilty for our more *internal* modules. Anyway, I digress. 

These 2 beans coded out above give us a glimpse of the simplicity to define beans and autowire dependencies in our modules. The registration of course would follow same structure as our "main" config file. 

```
bean<ComponentRepository>()
bean<ComponentService> { ComponentServiceImpl(ref()) }
```

Of course bean calls alone don't make these guys magically appear into our Spring context, we need to make the final `initialize` call to the encompassing `beans` block. This is something that we can do with Kotlin Spring. We can create an extension function to the `BeanDefinitionDsl` class and use that extension function as a place for our internal modules configuration. The actual addition of our scoped module to the main project, on top of the maven/gradle dependency, happens simply just calling the only other publicly exposed (apart from boundary interfaces) element, our *BeanDefinition function*.


```
fun BeanDefinitionDsl.componentBeans() {
    bean<ComponentRepository>()
    bean<ComponentService> { ComponentServiceImpl(ref()) }
}

// in our "main" config 
beans {
    bean<ApiHandler>()
    bean { firstRoutes(ref()) }
    componentBeans()
}.initialize(ctx)
```


What good is this then for our Spring application development? That is a question for someone else to answer. Maybe it reduces the usage of CGLIB quite a bit in our Spring context, maybe that is a good thing. More importantly it makes it easier to write classes and beans or autowire dependencies, on a Finnish keyboard the `@` character is sneakily hidden behind 'Alt Gr' and is therefore very hard to reach at times. 

Of course we could achieve a similar structure with XML, if one is prone to mentally torturing themselves.


[^1]: Do we have reactive drivers available and usable for Postgres/MySQL that we could use to our benefit in a non-blocking application? Not talking about wrappers here but something more native-ish.