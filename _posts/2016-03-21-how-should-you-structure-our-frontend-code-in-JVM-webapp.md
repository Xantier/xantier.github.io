# How should we structure our frontend code in JVM webapp?

If we think about our Maven/Cradle driven JVM webapp we usually have a very
strict structure when it comes to frontend resources. The standard folder lies somewhere in src/main/webapp. This guy, especially in spring driven application, usually has some folders to JSPs, some folders to Javascript and some folders for your CSS & images. More specifically your server rendered views usually end up being in WEB-INF folder within /webapp.

Tonight we'll look at how "that other" folder in your webapp could be structured. Many codebases I've been through seems to handle this location as the junkyard of the application, it contains an unstructured collection of JS, CSS and images mixed together in various ways. The folder itself can be called anything, but I usually want to make a distinction that nowadays our frontend is a separate application from our Java backend. That's why I usually name this folder as "app".

The app folder contains all your Javascript, CSS, and images. More specifically
it contains a folder that is exposed to the browser and multiple folders that contains your unbuilt source code for all frontend resources. I believe this is a good first step to start separating your JSPs from your actual frontend code.

Let's take a look how it looks and see what files and folders our application
would contain:

```
app
    / dist
    / stylesheet
    / src
    / test
    package.json
    .babelrc
    .eslintrc
    build.js
```

OK, looks straightforward enough.


3. /dist/:
 * Folder containing minified bundles meant to be distributed when deploying the web application
1. /src/:
 * Contains all JS files starting with runner and application entry point
 * Depending on how you want to structure your application contains folder per view and that folder contains an index.js as an entry point for the sources associated with that view. By view in here I mean usually a single individual part of our multi-page single-page-application
 * Also has util/common/etc. folders for shared code
1. /stylesheet/:
 * For css, less and sass files. This folder contains unminified sources that will be built and stored in the /dist folder for publishing.
3. /images/:
 * for... wait for it... images
5. /node_modules/:
 * dependencies loaded by node.js, think of .m2 folder. This should be excluded from the packaging when building the web application and gitignored
6. Root level files:
 * package.json
    * NPM config file, the heart of the application
    * Contains dependency lists, startup scripts and information about the application
    * Usual entry point for the frontend part think this as an equivalent to pom.xml
  * .babelrc
    * Configuration file for babel.
    * Babel is a transpiler that converts newer version of JavaScript, subset of JS, superset of JS to a JavaScript version compatible with modern (and not so modern) browsers
    * It is time to jump into ES2015/ES2016 train. There is no way around it
  * .eslintrc:
    * ES Lint config file for our project
    * Contains configurations for static analysis to be run to check our code quality and guard it against quality lapses
  * build.js
    * This is our build file containing all scripts to compile, build, transpile, run tests, analyze etc. our frontend codebase


Alright, that's a good start to think about frontend code as an invidual application. Next time we will dive deeper into the build.js file. That will be our workhorse when we will be developing frontend code. There are few good choices to choose from, we'll take a look at Gulp first and then transform more and more towards webpack world.
