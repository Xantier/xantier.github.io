---
layout: page
title: Launching Multiple Actions From Your Redux Action Creator
teaser:
tags:
  - Javascript
  - React
  - Redux
permalink:
header: no
---

# Launching Multiple Actions From Your Redux Action Creator

At times we stumble upon the need to launch multiple actions at the same time from your Redux action creators. Today we'll take a look at two techniques how we can achieve this.

I tend to separate action creators into two different types. We have async actions and sync actions. Syncs are simple action creators that only gather the needed data and invoke the correct reducers function. Asynchoronous ones might make some action, like calling the backend for additional data, and launch the reducers after this additional action is finished. Let's take a look how these two different methods look like.

## Circumventing the need for multiple actions

Most of the time in the first case there is actually no need to create multiple actions. If we think about the redux architecture all of our actions go through every single reducers function. Based on this we can actually figure out that if the data flow already touches all branches of our reducers we can just modify the reducer function to do the correct action when one is launched.

An example of this is something like the following:

We have a redux store that can be logically be divided into two different parts and therefore it's smart to create an individual reducer for each of these parts. Let's say one of the reducers handles a table and all the related data on that level, the second reducer handles a collection of rows in the table. Now if we create an action to add a new column to the collection and at the same time calculate the sum of all values in all the rows we have to touch both of these reducers. At this point you might notice where I am going with this. When we create our switch case statement in our reducers we create the same catch for both of them. Since all the actions go through all of our reducers, we will actually "launch multiple actions" with a single command.

## Using middleware

Redux has a very good documentation explaining the possibility to plug-in middleware to handle your asynchoronous actions in the application. With middleware you can add additional steps between your actions and reducers in your redux loop. One of these handy middlewares is ```react-thunk```. As far as I understand this used to be part of the react core but was in the end pulled out into its own module. You can install it naturally from NPM by running ```npm install react-thunk```.

To set up your thunk you wrap your store creation on the top level of the application to a partially applied function called ```applyMiddleware```. With this guy you get the opportunity to add middlewares into the redux loop. And example code would look like the following:

```
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { initialState } from './stateContainer';

const store = applyMiddleware(thunk)(createStore)(mainReducer, initialState());
```
Most of the fields are self-explanatory:
* On the first function call we assign our redux-thunk into the store
* Second function call creates the store itself using createStore from redux-thunk
* On the last function call we pass in our entry point to reducers and our initial application state

With this little configuration we gain the opportunity to return a function from our action creators instead of immediately dispatching an action.

* Synchronous action creator:

```
export function updateThing(value) {
  dispatch({
    type: UPDATE_THING,
    value: value
  });
}
```

* Asynchoronous action creator:

```
import superagent from 'superagent';
const fetchUrl = '/hello/world/1'

export function fetchData() {
  return (dispatch) => {
    dispatch({type: FETCH_DATA, status: XHR_STATES.IN_PROGRESS});
    return superagent
      .get(fetchUrl)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch({type: FETCH_DATA, status: XHR_STATES.FAIL});
        } else {
          const data = JSON.parse(res.text);
          dispatch({type: FETCH_DATA, status: XHR_STATES.SUCCESS, data: data});
        }
      });
  };
}
```

And in it's simplicity, that's the way to apply middleware to your redux loop and launch multiple actions from a single action creator.
