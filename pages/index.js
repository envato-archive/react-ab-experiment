import React from 'react'
import {Experiment, Variant, Loading} from '../src'
import 'whatwg-fetch'

class ReactABExperimentDemo extends React.Component {
  onEnrolment (experimentId, variantName) {
    // Send data to ga
    console.log(`Enrolled user to variant ${variantName} for experiment ${experimentId}`)
  }

  fetchVariantName(experimentId) {
    return fetch(`https://envato-experiments.herokuapp.com/market/experiments/${experimentId}/variant`, {
      credentials: 'include' })
      .then(response => response.json())
      .then(response => response.variant)
  }

  cacheGet(experimentKey) {
    return localStorage.getItem(experimentKey)
  }

  cacheSet (experimentKey, variantName) {
      return localStorage.setItem(experimentKey, variantName)
  }

  render () {
    return(
      <Experiment id="7FHd06ZdQ7iF_uU5QvfXTg" onEnrolment={this.onEnrolment} fetchVariantName={this.fetchVariantName} cacheGet={this.cacheGet} cacheSet={this.cacheSet} >
        <Loading>
          <div> LOADING..... </div>
        </Loading>
        <Variant name={0}>
          <div>Variant 0</div>
        </Variant>
        <Variant name={1}>
          <div>Variant 1</div>
        </Variant>
        <Variant name={2}>
          <div>Variant 2</div>
        </Variant>
        <Variant name={3}>
          <div>Variant 3</div>
        </Variant>
        <Variant name={4}>
          <div>Variant 4</div>
        </Variant>
        <Variant name={5}>
          <div>Variant 5</div>
        </Variant>
        <Variant name={6}>
          <div>Variant 6</div>
        </Variant>
        <Variant name={7}>
          <div>Variant 7</div>
        </Variant>
      </Experiment>
    )
  }
}

export default ReactABExperimentDemo
