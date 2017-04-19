import React from 'react'
import {Experiment, Variant, Loading} from '../src'

class ReactABExperimentDemo extends React.Component {
  onEnrolment (experimentId, variantName) {
    // Send data to ga
    console.log(`Enrolled user to variant ${variantName} for experiment ${experimentId}`)
  }

  render () {
    return(
      <Experiment id="abc123" onEnrolment={this.onEnrolment}>
        <Loading>
          <div> LOADING..... </div>
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

export default ReactABExperimentDemo
