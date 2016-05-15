---
layout: page
title: Modern frontend: Configuring Eslint and Gulp
teaser:
tags:
  - Modern Frontend
permalink:
header: no
---

# Configuring Eslint and Gulp

Eslint is one of my favourite tools that has been introduced in recent years to the JS community. Having my background in stricter languages I tend to have some level of longing to automatic helpers when developing for the frontend. The freedom that is introduced when jumping into dynamic languages is liberating and for hacking something working is very easy and quick to do. The development work flow is also simple enough, you modify your files and restart the server / hit F5 on your browser. The result is immediately visible, happy days.

As usual, there are of course tradeoffs that come with it. You might be familiar with messages like ```undefined is not a function```, ```missing ) after argument list```, ```Object expected``` when you hit F12 and open the console in your browser. After a while alt+tab to browser, hitting F5, opening the console and seeing what went wrong gets somewhat labourious and you might want every helper there is to give you some feedback when you are writing code instead. One of the tools that can help you with syntax, code style and to some extent best practices is [ESlint](http://eslint.org/).

I'll show you some tweaks that gets you a much faster feedback loop when developing with Javascript. For this blog post we'll use gulp instead of Webpack. If you want to take a look at the Webpack configuration of ESlint that is covered [in my earlier post.]({% post_url 2016-03-28-introducing-a-build-process-for-your-frontend-resources %})

First of all you want to have a good config file for your eslint. I recommend picking up either AirBnB one from their github page or [my modified version of it](https://gist.github.com/Xantier/fa87bbd52d2e2bfd3750). I like to keep ESlint as strict as possible to enforce better code style and notify about errors immediately. In my mind warnings are too easy to ignore and when you hit critical mass of them it changes the mindset to not care about the at all anymore.

By placing this ```.eslintrc ``` in to some folder in your project you are one step closer to Javascript development nirvana. There are few ways to run this file and get the needed feedback in your dev process. The easiest way is to install a ESlint CLI which you can run and see the results. An example command to lint your JS files would be similar to this:

(Assuming you have Node.js installed and you have run ```npm i eslint``` to install ESlint itself.[Note that if you are using my ESlint config file you might need to install addition plugins like eslint-plugin-react as well])
```
eslint -c src/.eslintrc 'src/**/*.js' --ignore-pattern 'src/vendor/*'
```

With this we run ESlint against all files ending .js in our ```src``` folder, excluding everything in the ```vendor``` folder. The config file we use is in that same ```src``` folder and it's called .eslintrc. We get immediate feedback from the linter to the console. Very nice.

This is all fine and dandy but we can take it one step further. Now we have to alt+tab to our terminal and run the eslint config manually to see the results. It would be so much nicer to have that be automagic and be run automatically every time we make a change to our source code. Worry not, Gulp to the rescue.

The configuration for Gulp to run eslint is very very simple. First we create a gulpfile.js to the root folder of our application. We need to use npm to install few dependencies to be able to run eslint via gulp:

```
npm install gulp-eslint
npm install eslint
npm install eslint-plugin-react
```

Then we need to configure our gulpfile to use this one plugin.

```
var eslint = require('gulp-eslint');

// Run Javascript linter
gulp.task('lint', function () {
  return gulp.src(['app/**/*.js', 'spec/**/*.js', 'app.js', '!spec/coverage/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});
```

Now we have gulp set up to run our linting nicely. If we run ```gulp lint``` we'll see the linting result. Next step is to make it run continuously every time we make a change to source file.

```
gulp.task('watch-lint', function() {
  gulp.watch('app/**/*.js', ['lint']);
});
```

There we go. No single command ```gulp watch-lint``` will start the watcher and harass us every time we write bad Javascript code.

One thing worth noting is that IntelliJ has a brilliant support for ESLint that will help keep your Javascript development cycle  within the IDE itself. 
