Nowadays more and more business logic is moving towards the frontend and the amount of Javascript code is increasing rapidly. There are few approaches that people have suggested as a proper architecture to a modular, microservice like and domain scoped manner. In my current role as an architect of our user facing application I was faced with the problem of scaling our previous monolith to suit the needs of new 0.5-1 million users we acquired. Pushing scaling problems on the backend aside for now, we'll focus on the frontend and how to scale that to match a large team working on the same multi-hundred thousand line monolithic Javascript codebase.

This post is split into parts explaining the starting situation, how we started tackling the technical debt we were facing and finally what we ended up as our final large-scale frontend application architecture.

In our case the inherited application was a single page application using server side rendered JSP files that were enhanced using JQuery as the sole Javascript framework. I don't think an application like this is very uncommon in the JVM world, whether it's JSPs, Thymeleaf or some other rendering logic pushing the final HTML to the browser. An architecture like that might be fairly old style and could easily contain a lot of both spaghetti code and global functions, variables and styles. That was the case for us as well.

# Old architecture
Our application had matured over the year and contained many shortcuts taken due to business reasons. The frontend was rendered on the backend. The routing was done on the frontend. The glue between these two techniques was an in-house built solution to request server rendered HTML from the server with an XHR request and attach that to a screen with Jquery's `.html()` method. The correct JSP file to be served (and rendered via an endpoint) was defined by request parameters on the URL, essentially defining the folder and filename of required JSP file. 

Obvious issues aside, this solution actually had the building blocks of a modern web application best practices. The underlying HTML was provided using *server side rendering*, making it fast and reducing work browser needs to be doing to get to first paint. A lot of the critical data was served with the server rendered HTML, embedded into JSP files and rendered to the DOM the same time rest of file was returned. This data was *hydrated* by Javascript and embedded into dynamically built elements on the screen. If the solution would have used streaming HTML technique to serve the HTML, we could have easily (when viewed from 10 000 feet, or 3048 meters) been talking about a performant, progressively enhaned application using best practices to construct the view layer to a user. Same could not have been said about the underlying techniques or technologies used to reach that solution.

Even though the solution was working and running in production nicely it did have some pitfalls. Javascript served was stuck on ES5 dictated by the browsers needed to be supported (IE9). JS bundles were served as a single blob increasing the needed download size every time new functionality was added to anywhere in the application. The DOM tree grew exorbitantly large due additional JSPs added as a HTML layer for modals, date pickers and other views that might or might not be needed to be rendered. The dynamic JS used to build pages was mostly global, built in a imperative manner and not composable. Changing bits of code could have broken functionality elsewhere, in a manner that was not visible until a proper testing was done for the *whole* application. CSS was mostly global, using underlying Bootstrap styles somewhere and somewhere globally overriding them. This lead to cascading failure of stylesheets where hacks were built on top of hacks to get even to the basic level functionality provided out of the box by Bootstrap.

The world of hurt in developer experience wasn't that good for the company, which was bleeding frontend developers to greener pastures and hindering new functionality development massively.


# Decision making
multi-page SPA? SPA? Migration paths?

# Intermediate Architecture
## Using JSP as source to HTML
Both Vue and React offer ways to mount an application to be a part of existing DOM tree, occupying only a small area of the final rendered HTML. We decided to take a step by step approach to replace the old spaghetti code with newer, more manageable technologies. 

# Second wave architecture
## Modules, module loading and separate App

# Final architecture
## Libraries, modules and features
## Communication between modules
## Sharing modules and features
## Getting rid of globalized styles?

# Future directions
## Externalizing frontend from backend
## Design System
## Micro Frontends


Frontend Application level architecture
The architecture on the overall application level loosely follows micro-kernel architecture pattern. 

Core
We have a small core folder that contains our architectures needed pieces. The should be kept minimal and should handle only the overarching questions around the application and modules. Current functionality in core:

index.js
Application entry point 
Registration of vue router and store, initialization of the Vue app
vswRouter.js
VueRouter initialization and settings
App.vue
Our application container holding the placeholder for our registered Vue modules/features
Registration of security directive
`App.vue` mounts itself to `#app_container` within `spa.jsp`. This `spa.jsp` will be the only html served from the backend to this part of the application.
store
Global level Vuex store
Few mutations and actions handling application core specific store changes
On mount our app is injected with both `vue-router` and `vuex` store.

The core folder should be kept as is and should not be touched unless something application level global changes are needed. Currently there is an account core module that contains security side of things as well as user info in the store. The docs for that can be found from: User Roles & Other Account Information wiki page.



Message broker
In the event (pun intended) of a need for modules to communicate with each other we should try to avoid reaching into other modules namespaced Vuex store if possible. A better way is to have a little bit of duplication of that particular data as long as proper steps are taken into account to maintain data integrity across store steps. 

To communicate between modules we can introduce a thin wrapper around Vuex store that exposes events sent to it via listenable topics. These topics can be exposed on the global Vuex store as well as using browser native means to share/receive information from other modules. Currently there is no need to communicate between modules and therefore this functionality is still in flux (another pun intended) not applicable yet. Note that usually these cases are very feature specific and are better handled on a case by case basis.



Shared libraries and code
Services / Utils / API Libs
Services would contain shareable business logic like manipulating times between backend provided timeformat and canonical ISO-8601 format. Other pieces of functionality in here could contain something like common composable validation services. Utils would contain extensions to lodash if there are need to create them.

We currently have a thin wrapper around JQuery ajax and RSVP promises that handle API calls with our backend. The solution work nicely and does its intended work though there are bits we can start appending to this layer. To increase application perceived performance we can add some caching within the API libs package as well as possible pre-fetching capabilities for certain features. One change we should modify fairly quickly is to add easier functionality to pipe backend responses to our Vuex stores. It is also good to enhance the current functionality to provide both reactive and promise based functionality.

Common components
Common components are like the name says Vue files that are shared as our common components. These will eventually be pulled into their own library we can use and share.





Individual team/feature/module level architecture
Note: We are talking about newer build components in here, omitting JQuery & JSP based vue components.

In general a module can be thought of a single root level URL path that contains a feature or set of features. This top level definition can be though as the aggregate root as defined in DDD. 

Currently modules are contained within the wider MIS application but in the future we can possible extract them as their own npm modules. This gives us the ability to increase common components/services versions within a module without the immediate need to upgrade other modules. This is something we can handle with yarn by using module aliases. 



For all future development it is recommended to use VueRouter and register your module to it in order to use the newer URL system rather than old hash based system. The module entrypoint will dictate routing within the module and can handle lazy loading of files and components. The router is stil somewhat slim on modules that are using it but it is recommended to try to make the effort of moving pg-level pages to their own VueRouter root path. 



The architecture within an individual module should loosely follow flux architecture defined by Facebook (similar pattern as previously define CQRS or whatever Microsoft used in their Windows back in the day, everything old is new again...). This is accomplished by using Vuex store and best practices within that community. Note that Vuex doesn't unfortunately impose immutability within the stor, Vue handles the mutated store state internally with its "reactive" nature. Most of state management within the module should go through the Vuex store cycle and most of the state should be kept within the store. Some exceptions to this are something like self-contained forms where the data is not needed elsewhere before a submit is clicked. 



The folder structure within a module should contain an index.js file that is the entry point to that module. This index.js contains and returns your module's route definition. The top component in your route definition array should be the module main entry point. This entry point can delegate to subcomponents by exposing its own <router-view> or it can start rendering the component hierachy immediately from there. 

Within the module it is recommended to have a store folder which contains all module specific Vuex store files. Within this folder you would have:

actions
A file containing functions that will dispatch/commit actions to the Vuex store
mutation-types
A file containing constants that define types of mutations the action will commit and mutator will catch
mutations
A file containing key value pairs of mutation-types, left side being the mutation-type → right side being the mutator function
getters
A collection of functions that are accessing the store and return only the needed data for components calling the getter
index.js
An entrypoint to this namespaced store
Imports global store and registers the module to it
imports actions, mutations and getters and registers them to the store
Initializes the store and store structure 


Most of the actions that manipulate the modules state should live outside of the components. This can be achieved by mapping Vuex store state, actions/mutations and getters into your components computed properties and methods instead of writing them within the component. With this separation we are able to decouple the presentation (component) from the business logic/state manipulation.



XHR calls should be made in actions and those actions can be launched by a user action or programmatically. 





