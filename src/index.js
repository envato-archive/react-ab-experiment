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
    const randomIndex = Math.floor(Math.random() * (this.variantComponents.length))
    const choosenVariantComponent = this.variantComponents[randomIndex]
    return choosenVariantComponent.props.name
  }

  componentDidMount () {
    this.setState({
      loading: false,
      variant: this.getVariant()
    })
  }

  render () {
    if (this.state.loading && typeof this.loadingComponent !== "undefined") {
      return this.loadingComponent
    }

    return this.state.variant
  }
}

const Variant = (props) => {
  return props.children
}

const Loading = (props) => {
  return props.children
}

export {Experiment, Variant, Loading}
