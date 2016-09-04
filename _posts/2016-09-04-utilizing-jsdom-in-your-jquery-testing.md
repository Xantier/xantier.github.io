---
layout: page
title: Utilizing JSdom in your JQuery testing
teaser:
tags:
  - javascript
  - testing
  - Modern Frontend
permalink:
header: yes
---

We have a big old codebase written in JQuery that we are currently chipping away on. Though there are plans to move forward from JQuery to a more modern frontend stack we still do have to maintain this legacy code. One way to get help the efforts off migrating to other tech it's always handy to have some unit tests to tell you if refactoring is going to blow up in your face. Old maintainers of the codebase were not best in the world to write tests due to difficulties of blumping them into HTML and JQuery mess. Currently the approach has luckily changed and most of that JQuery code is in its own IIFE modules.

This is a big jump forward and helps testability immensely. We tend to structure our IIFEs with a init method that works as a constructor. That constructor sometimes takes in params (in the form of JSP injected Java POJOs) but in reality it's main job is to initialize all our JQuery bindings and make them available to the browser. This init is usually called at the end of our JSP page after JQuery itself has been loaded. Now this is already testable. So lets take a look how that works in reality.

{% highlight javascript linenos=table %}
import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
const window = jsdom.jsdom(null, {virtualConsole: virtualConsole}).defaultView;

describe('Edit message page', () => {
  let $;
  const html = [
    '<textarea id="messageInput"></textarea>',
    '<textarea id="messagePreview"></textarea>'
  ].join('\n');

  const jqueryOverlay = fs.readFileSync('./lib/jquery.overlay.js', 'utf8');
  const jqueryTextComplete = fs.readFileSync('./lib/jquery.textcomplete.js', 'utf8');
  const requireJSFile = fs.readFileSync('./app/messages/edit.js', 'utf8');

  const brands = ['brand1', 'brand2'];
  const products = ['category1', 'category2'];
  const variables = {
    PLACEHOLDER: '666'
  };

  before(()=> {
    appendCommonScripts();
    appendScript(jqueryOverlay);
    appendScript(jqueryTextComplete);
    appendScript(requireJSFile);
    window.$('body').append(html);
    $ = window.$;
    window.messageEditPage.init(variables, brands, products);
  });
  // Testcases
});
{% endhighlight %}

Import lines on this snippet are after the imports. First we bind our JSdom virtual console to our actual console. This makes console.log based debugging so much easier since we will be seeing the console output in our expected place. The line after that creates our JSdom instance with default settings, apart from our console manipulation. In the end this is all all we need to spin up a usable dom.

When we start describing our test cases we introduce a bit of coupling between our HTML view and our testcase. We create a mock view that contains only elements that we are testing in our unit test. We don't really care what the actual view looks like, the only thing important is that we have element ids in the correct spot and all the elements under test exist in our mock view.

Next we load our needed javascript files from the filesystem and initialize few variables that are needed when starting our testing. On the before block we finally initialize the whole view with needed dependencies and spin up the system under test as well by calling it's init method.

Lines `appendCommonScripts` and `appendScript` are few helper methods which can be seen below. After our needed scripts are appended we can insert our HTML mock view to the body of our virtual dom.

{% highlight javascript linenos=table %}
function appendScript(script) {
  const scriptEl = window.document.createElement('script');
  scriptEl.innerHTML = script;
  window.document.body.appendChild(scriptEl);
}

function appendCommonScripts() {
  const jquery = fs.readFileSync('./lib/jquery-2.1.3.min.js', 'utf-8');
  const jqueryUI = fs.readFileSync('./lib/jquery-ui.min.js', 'utf8');
  const lodash = fs.readFileSync('./lib/lodash.min.js', 'utf8');
  appendScript(jquery);
  appendScript(lodash);
  appendScript(jqueryUI);
}
{% endhighlight %}

This helper loads needed files from the filesystem and appends them to the virtual dom we have created. JSdom handles all the rest for us.

After these steps JSdom is running smoothly and serving us with sweet two line HTML view. This view then contains few Jquery libraries, lodash and most importantly our system under test. With this setup we can write pure javascript and see how JQuery handles our frontend events:

{% highlight javascript linenos=table %}
it('should populate example text area with content written in messageInput text area', () => {
  const expexted = 'adfadsfdafdsdfsfads';
  const content = $('#messageInput');
  content.text(expexted);
  content.keyup();
  const actual = $('#messagePreview').text();
  expect(actual).to.be.equal(expexted);
});
it('should replace placeholder with a dummy value', () => {
  const text = 'should swap #PLACEHOLDER to the number of the beast';
  const content = $('#messageInput');
  content.text(text);
  content.keyup();
  const actual = $('#messagePreview').text();
  expect(actual).to.be.equal('should swap 666 to the number of the beast');
});
{% endhighlight %}

In these test cases we are asserting that when we write a message to the `messageInput` text area that content is copied over to the `messagePreview ` text area. In the system under test this is bound to a `keyup` event by JQuery so we send that event to our SUT to trigger the action. The second test is similar but asserts that in case our `messageInput` has a placeholder value in the content that is swapped to match our actual value. This is utilizing JQuery in adding and retrieving our needed data but naturally you can use whatever you want in your testcases.

Now that these testcases are humming along in our continuous integration system we can sleep a little better knowing that a big refactor to more modern web framework is in the pipeline.
