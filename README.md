A/B Experiment React Component

A/B Experiment for React.js

## Installation

```sh
$ npm install react-ab-experiment
```

## Usage

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
      <Experiment id="abc123" onEnrolment={this.handleEnrolment}>
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

## Development

There is an example `next.js` app in the `pages` folder.
To bring it up in develpoment:

```sh
$ yarn
$ yarn run dev
```
