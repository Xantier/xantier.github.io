---
layout: page
title: Java webapps and modern frontend: Introducing Build Process For Your Frontend Resources
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

Previously we took a look at how to structure our frontend application and noticed that a buildfile is one of the essential building blocks on the frontend of a modern webapp. Today we'll take a peek into processes around the buildfile and how that affects our development, build and release processes.

## Development

Now that we have decided to introduce a build process to our frontend we need to take a look at our development flow when creating our application. Back in the day the flow pretty much went hand in hand with with "code-refresh page-click items-fix mistakes" cycle. This cycle reminds quite a bit of my university years where the main purpose was to get the assignment done and hand it in so attention could be diverted towards more important things like alcohol, girls and video games. Naturally in work life these kind of things come back to bite you so you want to have some kind of proper structure around the process.

On backend this is already well established. When you are developing a new API you don't really spin up the application after every code change to hit the endpoint with Postman or similar and see what breaks and what doesn't. More often than not you have a test case or two developed to determine what kind of output you want your service to spit out and you develop based on those test cases. Something similar helps immensely on frontend as well and the first step towards that kind of development flow is a proper build process around your frontend code.

The building blocks of a frontend process I usually enjoy working with are things like automatically running tests on every code change, auto reloading the website and adding a compile step to the process to get immediate feedback based on static analysis.

The first step, automatically running your tests, is simple enough when you to let your IDE handle that so we won't touch that today. When we introduce a compile step, there is a need to modify our IDE provided test runners which is probably worthy of its' own blog post. So let's leave that to a later time.

The second and third parts are the things where this gets interesting. Auto reloading your website on code changes after a compile process that runs a static analysis on your dynamic language. If you have experience on large JS codebases you have learned to love and hate the dynamicity of the language. On one hand it makes it so easy to introduce new features and modify the codebase, on the other it also makes it so easy to introduce nicely hidden bugs, introduce changes that only break on runtime and create code that develops into a messy ball of spaghetti. To prevent this from happening and reducing the feedback cycle on code changes one of the most important things in my mind to introduce is [ESLint](http://eslint.org/).

Now that we play with the idea of static analysis on our codebase we might as well add additional resources to make it easier to develop. The next step would be to upgrade the language we are using to a more powerful one. ES6/ES2015 was finalized on summer 2015 and it was a massive jump for the language. It is definitely time for you to jump on that train and start using it. Because of the environment webapps are meant to run in, the web, we are not quite confident enough to write ES6 code to natively target browsers. It is a safer bet to introduce a compile (or transpile) process to make your code ES5 compatible, that way all current browsers are able to run it. To achieve this we will introduce another tool to our toolchain: [Babel](https://babeljs.io/).

Lastly we have a bunch of nice to haves that we can also introduce at the same time. Hot loader to reload our files automatically, dev-server to proxy our stuff to our proper server, bundler to create different bundles for our code and imported libraries, source map creator so we can more easily debug our code on browsers. So how do we achieve all these things?

In my opinion there two good options to get this working nowadays. The best one is Webpack and a decent alternative is Gulp. Today we will take a look at a config that is built around webpack.

We have three or four significant files that we need to look at. These are:
* webpack.config.js (& webpack.production.config.js)
* package.json
* development-server.js
* run.js (optional)

Let's start with the easiest one: package.json

At this point in time you should be familar with package.json. It's the heart of a node.js application. It contains all the info about the application like licenses, repository urls, maintainers, dependencies and scripts to run some stuff in the application. We are interested in the scripts part of this.

```
/** snip **/
"scripts": {
  "start": "node app/run.js",
  "build": "webpack --config webpack.production.config.js",
  "test": "./node_modules/.bin/mocha --reporter spec --compilers js:babel-core/register './test/**/*.js' ",
  "test-cov": "./node_modules/.bin/babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- -R spec './test/**/*.js'",
  "lint": "./node_modules/.bin/eslint -c .eslintrc -o ./reports/eslint.xml -f checkstyle app/**/*"
},
/** snip **/
```

These are usually my scripts in my package.json file.
1. start: Runs the application in dev mode by starting a dev server and autoreloads + watching changes on the app.
2. build: Creates a production bundle of the application and moves it to the correct location
3. test: Compiles the source code and runs tests
4. test-cov: Same as test but this time creates a coverage report as well
5. lint: Runs static analysis on the code and inspects the structure of the code base as well as style and formatting of the code

Straightforward enough. Without going any deeper on other things, this time we'll take a look at the ```start``` script only. It uses node.js to run a file called run. OK, that's simple. What does our run.js contain?

```
/**
 * A Babel wrapper so we can use ES6 on our server configuration file
 * and subsequent files.
 * Babel transpiles ES6 and JSX to ES5 so node.js runtime is able to
 * understand it.
 *
 * After registering the babel hook, we call our development-server
 * application.
 */
/* eslint-disable */
require('babel-core/register')();
var devServer = require('./development-server');
devServer.run();
/* eslint-enable */
```

Hmm. Nothing really, it is just introducing a compile process to our config files and passing the buck to our development-server. What's in there then?

``` development-server.js
/**
 * Because we have registered a babel-hook to our application
 * we are able to use ES6 imports in our development server
 * configuration file.
 */

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';
/* eslint-disable */
export function run() {
  let bundleStart = null;

  /**
   * First we fire up Webpack via code using the configuration we imported
   */
  const compiler = Webpack(config);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  /**
   * We configure webpack dev server. This beast will be the heart
   * of our development cycle when we create the frontend of our application
   */
  const bundler = new WebpackDevServer(compiler, {

    /**
     * Context path where webpack bundled resources are served from. Should match server config
     * (for example <contextPath>/demoApp</contextPath>)
     * /app/dist/ is the source of our bundled app. Since that is the only folder we are serving
     * through dev server, we can hardcode that in.
     */
    publicPath: '/demoApp/app/dist/',

    /**
     * We create a proxy with our dev-server and serve our bundled resources through that.
     *
     * In webpack config we inject webpack-dev-server and hot-reloader to our bundle.
     * To make full use of this functionality when developing we create a lightweight node.js
     * development server that we use as our main entry point to the application. Instead of hitting
     * localhost:8080 with your browser you hit the port of this development server. The dev-server
     * passes through all requests to our Spring application, apart from the ones we have defined.
     * In this case every request endpoint which does not match /dist/bundle.js will be going straight to
     * localhost:8080, in case the request is calling for /dist/*.js the dev-server will serve
     * that resource instead.
     */
    proxy: [{
      path: /(?!bundle.js)$/,
      target: 'http://localhost:8080/'
    }],

    /**
     * We enable hot reloading to our dev-server. This means that everytime you hit ctrl+s
     * to save your file dev-server will notice that and hot-swap/rebundle the application.
     * After that dev-server will notify the browser which will be updated.
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  /**
   * Finally we fire up our configured dev-server and start listening the port 3000.
   * This is the endpoint where we should point our browsers into and where the
   * dev-server will proxy our requests to our spring server.
   */
  bundler.listen(3000, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
}
/* eslint-enable */
```


OK. Now we are getting somewhere. It seems to import a webpack, webpack configuration and webpack dev server and then run the webpack dev-server with our imported config. Last piece of the puzzle is our webpack config file. It looks like this:

```
/**
 * Development config file for webpack
 * Creates two bundles:
 * 1. bundle.js -> Our application
 * 2. vendor.js -> Vendor bundle containing libraries
 *
 * Injects webpack-dev-server to our page so hot loading
 * of our application is possible.
 */

var path = require('path');
var Webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  /**
   * Key, value config defining the entry points to our application.
   * 1. Bundle entry contains our application entry point and webpack-dev-server entry points.
   * Dev-server is added to the bundle so our application can be hot reloaded while developing
   *
   * 2. vendor entry contains vendor libraries from node_modules. Every time for example react is
   * required/imported webpack replaces that with a module from our vendor bundle
   */
  entry: {
    bundle: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/dev-server',
      './app/index.js'
    ],
    vendor: ['react']
  },

  /**
   * Output files from our build process. [name].js (or [id].js) will create a file
   * based on the key value of entry point configuration.
   */
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/'
  },

  /**
   * Additional loaders that webpack will run against the bundle it creates.
   * For our production build we use babel and eslint.
   *
   * React hot loader implements hot loading functionality for our react components.
   * This way when running our development server (dev-server) we can modify files and
   * the dev-server will refresh our application keeping the state intact.
   *
   * Babel transpiles ES6 and JSX files to ES5 javascript so it is compatible
   * to current browser versions.
   *
   * Eslint runs static analysis against our code and errors or warns in case
   * we have written possibly bad code.
   */
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot-loader'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader'}
    ]
  },

  // Eslint config file location
  eslint: {
    configFile: './.eslintrc'
  },

  /**
   * We tell webpack to create a source map for our devtools. Source maps are supported
   * by both Chrome and Firefox.
   */
  devtool: 'source-map',

  /**
   * Our additional plugins to be used during the build process
   */
  plugins: [

    // HotModuleReplacement runs on our dev server and hot swap new code
    // when changes to the codebase is made during development
    new Webpack.HotModuleReplacementPlugin(),

    // NoErrors plugin makes sure that build process is run only when
    // there are no errors in the code.
    new Webpack.NoErrorsPlugin()
  ]
};
```

Cool beans. That's all the configurations needed to introduce a proper frontend workflow with compile, hot reloading and development server. Now if we want to develop we will open our terminal, navigate to the folder where our package.json is located and type in ```npm start```. This will fire up our development server and start serving our compiled and bundled application in port 3000. Developer happiness achieved.

### Building and releasing

Next step is to introduce this build process to our Continuous Integration system. Because naturally we have set up Jenkins to run our maven/cradle project already it is a good idea to follow that path and introduce frontend building via that route as well. We can do this multiple ways but the easiest path is to introduce a maven plugin called "frontend-maven-plugin". With this guy we can install node.js, all needed dependencies and build, compile, bundle and transfer our bundled application to the correct location. Below we have our maven config for this:

```
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>0.0.26</version>
    <configuration>
        <workingDirectory>src/main/webapp/app</workingDirectory>
        <installDirectory>src/main/webapp/</installDirectory>
    </configuration>
    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <phase>generate-sources</phase>
            <configuration>
                <nodeVersion>v4.2.3</nodeVersion>
                <npmVersion>2.14.7</npmVersion>
            </configuration>
        </execution>
        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <phase>generate-sources</phase>
        </execution>
        <execution>
            <id>webpack build</id>
            <goals>
                <goal>webpack</goal>
            </goals>
            <phase>generate-sources</phase>
            <configuration>
                <arguments>--config webpack.production.config.js</arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```

That's pretty much it. Now we just configure our CI server to run this maven goal as well. The plugin will contact it's node.js who will do all the heavy lifting. Instead of running the development configuration of our webpack it will run production config which contains few tweaks ti produce our final bundled product. The production.config.js looks like this:


```
/**
 * Production config file for webpack
 * Creates two bundles:
 * 1. bundle.js -> Our application
 * 2. vendor.js -> Vendor bundle containing libraries
 *
 */
var path = require('path');
var Webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  /**
   *  Key, value config defining the entry points to our application.
   *  1. bundle entry contains everything that is required by ./app/index.js and its' descendants
   *  2. vendor entry contains vendor libraries from node_modules. Every time for example react is
   *  required/imported webpack replaces that with a module from our vendor bundle
   *
   *  We can define as many entry points as we want. This way we can split out our application to
   *  different pages and include only needed code to those pages.
   */
  entry: {
    bundle: './app/index.js',
    vendor: ['react']
  },
  /**
   * The output defined contains only our bundle, the code from our application.
   * Created bundle will be output to /dist folder and will be called bundle.js
   * In case we would have multiple chunks we can simply name the output filename
   * as [name].js and the bundled file would be named after the key from entry config.
   * (See webpack.config.js for this.)
   */
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/'
  },

  /**
   * Additional loaders that webpack will run against then bundle it creates.
   * For our production build we use babel and eslint.
   *
   * Babel transpiles ES6 and JSX files to ES5 javascript so it is compatible
   * to current browser versions.
   *
   * Eslint runs static analysis against our code and errors or warns in case
   * we have written possibly bad code.
   */
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader'}
    ]
  },
  // Eslint config file location
  eslint: {
    configFile: './.eslintrc'
  },

  /**
   * Our additional plugins to be used during the build process
   */
  plugins: [
    // Chunk plugin makes the work of pointing our chunked bundle to correct
    // vendor bundle location
    new Webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

    // Uglify JS minimizes our application bundle
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

    // Deduping removes duplicated dependencies in case we have accidentally
    // required them multiple times. Decreases bundle size.
    new Webpack.optimize.DedupePlugin(),

    // NoErrors stops bundling in case our code errors out.
    new Webpack.NoErrorsPlugin()
  ]
};
```

To do this manually we can naturally run it with our own node.js installation. The command for running it would be ```build``` from our package.json. I think that's enough for today. Something to ponder about would probably be the remaining step on this process, namely tests and how to run them with a compile process.
