---
layout: post
title:  "Setting up proxyquire to mock your modules"
date:   2016-09-04 17:23:57
categories: javascript node.js
---

# Setting up proxyquire to mock your javascript modules

When testing your javascript components it is sometimes essential to mock out the boundaries of your application. This way you don't actually have to worry about hitting that API or really querying that database in your tests. It also helps quite a bit when you can define non-essential actions the boundary must do instead of running the real thing.

One library that I've found useful for this kind of mocking is [Proxyquire](https://github.com/thlorenz/proxyquire). If you click the link you will see that the library is well documented on their Github page and is easy enough to set up in your tests.
Below is a snippet of how we are using this tool in our mocha driven tests:


{% highlight javascript %}
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom-global';
import {expect} from 'chai';
import proxyquire from 'proxyquire';

describe('System Under Test', () => {

  let dom, Sut;
  before(() => {
    dom = jsdom();
    const mockStateContainer = {};
    mockStateContainer.hardcoded = {
      includes: (col) => {
        return col === 'HARDCODED';
      }
    };
    mockStateContainer.window = {};
    proxyquire.noCallThru();
    proxyquire.noPreserveCache();
    Sut = proxyquire(
      '../../../app/SystemUnderTestComponent.jsx',
      {'./stateContainer': mockStateContainer}
    ).Sut;
  });

  after(() => {
    dom();
  });

  it('should display HARDCODED', () => {
    const component = TestUtils.renderIntoDocument(<Sut values={['HARDCODED']}/>);
    expect(component.refs.display.text).to.contain('HARDCODED');
  });
  it('should not display SOFTCODED', () => {
    const component = TestUtils.renderIntoDocument(<Sut values={['SOFTCODED']}/>);
    expect(component.refs.display.text).to.not.contain('SOFTCODED');     
  });
});
{% endhighlight %}

Here we are testing a React component called SystemUnderTestComponent. If you take a closer look in the describe function you will see that we are initializing that guy in there instead of importing it as a standard module. This option gives us the opportunity to mock dependencies that our Sut component has acquired.

In this case we mock our stateContainer and more specifically we mock only one exposed array from that module. In our setup we are holding an array of hardcoded values in our stateContainer and we expose that to few external modules instead of shipping them within our actual state. For testing we want to mock out these hardcoded values to match something more simple. So when our system under test imports a statecontainer and looks for a method Array.includes in our hardcoded array, it will find our mocked simple method that returns true if value is `HARDCODED`. In all other cases it will return false.

Simple solution to an unfortunate architecture blunder inserted to our frontend application.

Other interesting thing here is our usage of JSdom. We create a javascript DOM and render our React components into that instead of using Reacts lightweight testutils. These has few advantages, mainly giving the opportunity to get a fuller view of our components and secondly keeping the test setup somewhat similar between [our JQuery tests]({% post_url 2016-09-04-utilizing-jsdom-in-your-jquery-testing %}) and React tests.
