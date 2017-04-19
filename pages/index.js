import React from 'react'
import {Experiment, Variant} from '../src'

class ReactABExperimentDemo extends React.Component {
  onEnrolment (experimentId, variantName) {
    // Send data to ga
    console.log(`Enrolled user to variant ${variantName} for experiment ${experimentId}`)
  }

  render () {
    return(
      <div>
        <Experiment id="abc123" onEnrolment={this.onEnrolment}>
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
      </div>
    )
  }
}

export default ReactABExperimentDemo
