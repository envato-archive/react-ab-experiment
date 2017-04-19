import React from 'react'

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
      const experimentId = this.props.id
      this.props.onEnrolment(experimentId, variantName)
      localStorage.setItem(this.experimentKey(), variantName)
    }
    return this.store[variantName]
  }

  chooseRandomVariantName () {
    return Math.floor(Math.random() * (this.props.children.length))
  }

  componentDidMount () {
    const variant = this.getVariant()

    this.setState({
      loading: false,
      variant: variant
    })
  }

  render () {
    const variant = this.state.variant

    return variant
  }
}

class Variant extends React.Component {
  render () {
    return this.props.children
  }
}

export {Experiment, Variant}
