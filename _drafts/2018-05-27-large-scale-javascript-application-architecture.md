Nowadays more and more business logic is moving towards the frontend and the amount of Javascript code is increasing rapidly. There are few approaches that people have suggested as a proper architecture to a modular, microservice like and domain scoped manner. In my current role as an architect of our user facing application I was faced with the problem of scaling our previous monolith to suit the needs of new 0.5-1 million users we acquired. Pushing scaling problems on the backend aside for now, we'll focus on the frontend and how to scale that to match a large team working on the same multi-hundred thousand line monolithic Javascript codebase.

In our case the inherited application was a single page application using server side rendered JSP files that were enhanced using JQuery as the sole Javascript framework. Needless to say an architecture like that is fairly old style and contained a lot of both spaghetti code and global functions, variables and styles.

# Old architecture

# Decision making
multi-page SPA? SPA? Migration paths?

# Intermediate Architecture
## Using JSP as source to HTML

# Second wave architecture
## Modules, module loading and separate App

# Final architecture
## Libraries, modules and features
## Communication between modules
## Sharing modules and features
## Getting rid of globalized styles?

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





