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
        store[child.props.name] = child
        return store
      },{})
  }

  experimentKey () {
    return `experiment_${this.props.id}`
  }

  getVariant () {
    let variantName = localStorage.getItem(this.experimentKey())
    if (variantName == null) {
      variantName = this.chooseRandomVariantName()
      localStorage.setItem(this.experimentKey(), variantName)
    }
    return this.store[variantName]
  }

  chooseRandomVariantName () {
    return Math.floor(Math.random() * (this.props.children.length))
  }

  sendGaEvent(variant) {
    ga((tracker) => {
      tracker.set('expId', this.props.id)
      tracker.set('expVar', variant.props.name)
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

    if (variant == null) {
      return null
    }

    return variant
  }
}

class Variant extends React.Component {
  render () {
    return this.props.children
  }
}

export {Experiment, Variant}
