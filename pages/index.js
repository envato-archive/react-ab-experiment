import React from 'react'
import {Experiment, Variant} from '../src'

class ReactABExperimentDemo extends React.Component {
  render () {
    return(
      <div>
        <Experiment>
          <Variant variant="0">
            <div>Variant 0</div>
          </Variant>
          <Variant variant="1">
            <div>Variant 1</div>
          </Variant>
        </Experiment>
      </div>
    )
  }
}

export default ReactABExperimentDemo
