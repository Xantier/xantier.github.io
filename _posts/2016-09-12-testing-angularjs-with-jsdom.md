---
layout: post
title: Testing AngularJS with JSDom
teaser:
tags:
  - Javascript
  - Angular
  - JSDom
permalink:
header: yes
---

Last week we took a look how to [utilize JSDom to test JQuery code.]({% post_url 2016-09-04-utilizing-jsdom-in-your-jquery-testing %}) Now let's take a peek how we can reach the same conclusion with AngularJS code. If you went through the linked post most of the stuff here is probably more or less the same. Regardless of that there might be few angular specific bits here that are of use on top of that.

We'll take a look at the code bit by bit. First imports that we need to attach to our test file, lets call that `test.test.js`:

```javascript
import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
```

Very slim imports, the only things really needed on test side are JSdom itself, expect from chai to assert our tests and filesystem handlers from node.js. The slimness is because we will be using `fs` to load the other files.

The next few lines of our file will initialize our dom implementation, `jsdom`. First we'll create a virtual console for debugging purposes, if we at some point need to `console.log` from within our system under test we'll forward those messages to the console in our test environment. Then we'll create the actual `jsdom` itself and attach our virtual console to it.

```javascript
const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
const window = jsdom.jsdom(null, {virtualConsole: virtualConsole}).defaultView;
```


Now let's take a look at what we are loading in:

```javascript
function appendScript(script, cb) {
  const scriptEl = window.document.createElement('script');
  scriptEl.innerHTML = script;
  window.document.body.appendChild(scriptEl);
  if (cb) cb();
}

function appendCommonScripts() {
  const scripts = [
    './lib/jquery-2.1.3.min.js',
    './lib/lodash.min.js',
    './lib/angular.js',
    './app/common/angular/services.js'
  ];
  scripts.forEach(function (it) {
    appendScript(fs.readFileSync(it, 'utf-8'));
  });
}
```

Cool, that's a bunch of files. First all the libraries that we are using `jquery`, `lodash` and `angular` and then an internal library that contains few of the services our system under test is using. Since we have initialized our `jsdom` we have a global window element available that we can use to attach our scripts into. We'll inline these guys into the DOM implementation and let `jsdom` handle loading of them.

Next thing we can do is to jump into our test closure. We again use `mocha` to run the test so we'll start with familiar call `describe` function:

```javascript
describe('List page', () => {
  let $;
  const html = fs.readFileSync('./templates/sutTemplate.html', 'utf8');
  const requireJSFile = fs.readFileSync('./app/sut/list.js', 'utf8');  

  before(()=> {
    appendCommonScripts();
    appendScript(requireJSFile, function () {
      window.$('body').append(html);
      $ = window.$;
      mockApiService(window);
    });

  });
  /**
    Actual test cases, see below
  **/
});
```

First we load two more files with the help of `fs`, our HTML template, the same one we use in our application code (without JS imports) and our system under test. These will be attached to the DOM in our `before` function. In our `before` we also have a call to append all the libraries we previously defined. After that we bind Jquery dollar to a local element for ease of access and make a mysterious call to mock an API service. Next let's take a look at implementation of that function:

```javascript
function mockApiService(window) {
  window.ourOwnServices.service("apiService", function () {
    this.get = function (url) {
      window.getCalled = true;
      return {
        success: function (callback) {
          window.successCalled = true;
          callback([{
            id: 1,
            name: 'Test Name',
          }]);
        }
      }
    }
  });
}
```

The function itself is fairly simple. Wht we do in here is just simply override a globally exposed `ourOwnServices` Angular service module. In that service module we target one specific thing, `apiService` and more specifically only it's `get` method. This is because we know that our actual application module is injected with `OurOwnServices` and we want to mock that out. We also know that only `apiService.get` method is used in our system under test. Our mock implementation of the get method assign few global variables to `window` scope. These are later used in the test to assert that these functions are called.

The code in our services.js would look something like this:

```javascript
var ourOwnServices = angular.module('OurOwnServices', []);
ourOwnServices.service("apiService", ["$http", function($http) {
  /* snip */
}]);
```

Note that we don't even bother injecting angular `$http` to our mocked service, we know on instantiation time that we will be only returning a predefined object.

The last piece of the puzzle is our actual test cases. These guys are very simple for this implementation:

```javascript
it('should make ajax request', () => {
  expect(window.getCalled).to.be.ok;
  expect(window.successCalled).to.be.ok;
});

it('should display correct name on first column of first row', () => {
  const firstColumnText = $('table tr:first-child td:first-child').html();
  expect(firstColumnText).to.be.equal('Test Name');
});
```

The first test asserts that our service method has been called by our system under test. The second checks that our system under test has replaced angular template placeholder with the correct value in our list view. The meaningful line on our template HTML is similar to:

```html
<!-- snip -->
<tbody>
    <tr ng-repeat="elem in elements">
        <td>{{elem.name}}</td>
<!-- snip -->
```

And our angular code that makes the call to our API is simply

```javascript
$scope.getElements = function() {
  apiService.get(url)
    .success(function(elems){
      $scope.elements = elems;
  });
};
```

For more thorough testing you would be probably using a proper mocking library like `sinon` and asserting that proper arguments are passed to mocked functions etc. For this simple demonstration though a hardcoded manually mocked method is sufficient.
