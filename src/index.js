import React from 'react'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      variant: null
    }

    this.variantComponents = this.props.children.filter((child) => {
      return child.type.displayName == "Variant"
    })
    this.loadingComponent = this.props.children.find((child) => {
      return child.type.displayName == "Loading"
    })
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
    return this.variantComponents.find((variant) => { return variant.props.name == variantName })
  }

  chooseRandomVariantName () {
    return Math.floor(Math.random() * (this.props.children.length))
  }

  componentDidMount () {
    this.setState({
      loading: false,
      variant: this.getVariant()
    })
  }

  render () {
    if (this.state.loading && this.loadingComponent !== undefined) {
      return this.loadingComponent
    }

    return this.state.variant
  }
}

class Variant extends React.Component {
  render () {
    return this.props.children
  }
}

class Loading extends React.Component {
  render () {
    return this.props.children
  }
}

export {Experiment, Variant, Loading}
