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
import {Experiment, Variant, Loading} from 'react-ab-experiment'

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
        <Loading>
          <div>Loading...</div>
        </Loading>
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
If we want to cache the chosen variant for a user, we can set the `cacheGet` and `cacheSet` props.
On the first load, the user will be enrolled in a variant and the variant name will be cached. On subsuqent requests, we will get that variant name out of the cache.

Using localStorage for example:
```js
import React from 'react'
import {Experiment, Variant, Loading} from 'react-ab-experiment'

class myApp extends React.Component {
  handleEnrolment (experimentId, variantName) {
    ...
  }

  cacheGet (experimentKey) {
    return localStorage.getItem(experimentKey)
  }

  cacheSet (experimentKey, variantNumber) {
    return localStorage.setItem(experimentKey, variantNumber)
  }

  render () {
    return(
      <Experiment id="abc123" onEnrolment={this.handleEnrolment} cacheGet={this.cacheGet} cacheSet={this.cacheSet} >
        <Loading>
          <div>Loading...</div>
        </Loading>
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
import {Experiment, Variant, Loading} from 'react-ab-experiment'
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
        <Loading>
          <div>Loading...</div>
        </Loading>
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

### Experiment
Required component which defines the ab experiment.

#### id
Required string which defines the id of the experiment.

#### onEnrolment(experimentId, variantName)
Required callback function which is used to log the variant a user has been enrolled into for the experiment.

#### cacheGet(experimentKey)
Optional callback function which gets the current user's variant name for the experiment from the cache.
You could use any browser storages `cookies`, `localStorage` etc

#### cacheSet(experimentKey, variantName)
Optional callback function which sets the current user's variant name for the experiment to the cache.
You could use any browser storages `cookies`, `localStorage` etc

#### fetchVariantName(experimentId)
Optional callback function which fetches the variant the user is enrolled into for the experiment, from a remote server. It requires the return value to be a `Promise`.

### Variant
Required component which defines the different variants of the ab experiment.

#### name
Required string which defines the name of the variant.

### Loading
Optional component which defines what to display before a variant is chosen and rendered on the screen. You could use a loading spinner or blank component.

## Examples

Checkout the example app in the following [github repo](https://github.com/envato/react-ab-experiment-example) and on the [example website.](https://react-ab-experiment.herokuapp.com)
