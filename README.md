# A/B Experiment React Component

A/B Experiment for React.js

## Installation

```sh
$ npm install react-ab-experiment
```

## Usage

### Minimal required props

The default behaviour is that a variant will be randomly chosen, within our react component, and rendered. When a user is enrolled into a variant it will call the `onEnrolment` callback which contains your code to report the enrolment to your ab-testing analytics program (eg: Google Analytics).

The variant is not cached, so on a new page render and new variant will be chosen.

For example:
```js
import React from 'react'
import {Experiment, Variant} from 'react-ab-experiment'

class myApp extends React.Component {
  handleEnrolment (experimentId, variantName) {
    // send enrollment data to AB test reporting tool, eg: Google Analytics
    ga('set', 'expId', experimentId)
    ga('set', 'expVar', variantName)
    ga('send', 'pageview')
  }

  render () {
    return(
      <Experiment id="abc123" onEnrolment={this.handleEnrolment} >
        <Variant name="0">
          <div>Variant 0</div>
        </Variant>
        <Variant name="1">
          <div>Variant 1</div>
        </Variant>
        <Variant name="2">
          <div>Variant 2</div>
        </Variant>
      </Experiment>
    )
  }
}
```

### Include caching
If we want to cache the chosen variant for a user, we can set the `cache` props with a javascript object which has a `get` and `set` functions.
On the first load, the user will be enrolled in a variant and the variant name will be cached. On subsuqent requests, we will get that variant name out of the cache.

Using localStorage for example:
```js
import React from 'react'
import {Experiment, Variant} from 'react-ab-experiment'

const LocalStorageCache  = {
  get:  (key) => {
    return window.localStorage.getItem(key)
  },
  set: (key, value) => {
    return window.localStorage.setItem(key, value)
  }
}

class myApp extends React.Component {
  handleEnrolment (experimentId, variantName) {
    ...
  }

  render () {
    return(
      <Experiment id="abc123" onEnrolment={this.handleEnrolment} cache={LocalStorageCache}
        <Variant name="0">
          <div>Variant 0</div>
        </Variant>
        <Variant name="1">
          <div>Variant 1</div>
        </Variant>
        <Variant name="2">
          <div>Variant 2</div>
        </Variant>
      </Experiment>
    )
  }
}
```

### Fetching variants from a Remote Server
If you would like to get the variant a user is enrolled to using a remote server we can set the `fetchVariantName` props. This expects a `promise` to be returned with the variant name as the resolved value.

For example:

```js
import React from 'react'
import {Experiment, Variant} from 'react-ab-experiment'
import 'whatwg-fetch'

class myApp extends React.Component {
  handleEnrolment (experimentId, variantName) {
    ...
  }

  fetchVariantName (experimentId) {
    return fetch(`https://my-ab-test-server.com/experiments/${experimentId}/variant`, {
      credentials: 'include' })
      .then(response => response.json())
      .then(response => response.variant)
  }

  render () {
    return(
      <Experiment id="abc123" onEnrolment={this.handleEnrolment} fetchVariantName={this.fetchVariantName} >
        <Variant name="0">
          <div>Variant 0</div>
        </Variant>
        <Variant name="1">
          <div>Variant 1</div>
        </Variant>
        <Variant name="2">
          <div>Variant 2</div>
        </Variant>
      </Experiment>
    )
  }
}
```

## API

##### Experiment
Required component which defines the ab experiment.

**id**
Required string which defines the id of the experiment.

**onEnrolment(experimentId, variantName)**
Required callback function which is used to log the variant a user has been enrolled into for the experiment.

**cache**
Optional object with a `get` and `set` function. This is how you define if variants should be cached in `localStorage`, `cookies`, in memory etc.

eg:
```js
localStorageCache = {
  get: (key) => {
    return window.localStorage.getItem(key)
  },
  set: (key, value) => {
    return window.localStorage.setItem(key, value)
  }
}
```

**fetchVariantName(experimentId)**
Optional callback function which fetches the variant the user is enrolled into for the experiment, from a remote server. It requires the return value to be a `Promise`.

###### Variant
Required component which defines the different variants of the ab experiment.

**name**
Required string which defines the name of the variant.

## Examples

Checkout the example app in the following [github repo](https://github.com/envato/react-ab-experiment-example) and on the [example website.](https://react-ab-experiment.herokuapp.com)
