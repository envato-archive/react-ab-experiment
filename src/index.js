import React from 'react'
import ga from './ga'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      variant: null
    }

    this.store = this.props.children.reduce((store, child) => {
        store[child.props.variant] = child
        return store
      },{})
  }

  experimentKey () {
    return `experiment_${this.props.id}`
  }

  getVariant () {
    let variantNumber = localStorage.getItem(this.experimentKey())
    if (variantNumber == null) {
      variantNumber = this.chooseRandomVariant()
      localStorage.setItem(this.experimentKey(), variantNumber)
    }
    return this.store[variantNumber]
  }

  chooseRandomVariant () {
    return Math.floor(Math.random() * (this.props.children.length-1))
  }

  sendGaEvent(variant) {
    ga((tracker) => {
      tracker.set('expId', this.props.id)
      tracker.set('expVar', variant.props.variant)
      tracker.send('pageview')
    })
  }

  componentDidMount () {
    const variant = this.getVariant()

    this.sendGaEvent(variant)
    this.setState({
      loading: false,
      variant: variant
    })
  }

  render () {
    const variant = this.state.variant

    return (
      <div>
        {variant && variant}
      </div>
    )
  }
}

class Variant extends React.Component {
  render () {
    return this.props.children
  }
}

export {Experiment, Variant}
