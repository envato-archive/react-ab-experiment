import React from 'react'
import PropTypes from 'prop-types'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.experimentId = this.props.id
    this.variantComponents = this.props.children.filter((child) => {
      return child.type.displayName == "Variant"
    })
    this.loadingComponent = this.props.children.find((child) => {
      return child.type.displayName == "Loading"
    })

    this.state = {
      loading: true,
      variant: null
    }
  }

  experimentKey () {
    return `experiment_${this.experimentId}`
  }

  getVariantName () {
    let variantName = this.props.cacheGet(this.experimentKey())
    if (variantName == null) {
      return (this.fetchVariantName() || this.chooseRandomVariantName()).then((variantName) => {
        this.props.onEnrolment(this.experimentId, variantName)
        this.props.cacheSet(this.experimentKey(), variantName)
        return variantName
      })
    } else {
      return Promise.resolve(variantName)
    }
  }

  chooseRandomVariantName () {
    const randomIndex = Math.floor(Math.random() * (this.variantComponents.length))
    const choosenVariantComponent = this.variantComponents[randomIndex]
    return Promise.resolve(choosenVariantComponent.props.name)
  }

  fetchVariantName() {
    return this.props.fetchVariantName && this.props.fetchVariantName(this.experimentId)
  }

  componentDidMount () {
    this.getVariantName().then((variantName) => {
      const variant = this.variantComponents.find(variant => variant.props.name == variantName)
      this.setState({
        loading: false,
        variant: variant
      })
    })
  }

  render () {
    if (this.state.loading && typeof this.loadingComponent !== "undefined") {
      return this.loadingComponent
    }

    return this.state.variant
  }
}

Experiment.propTypes = {
  id:               PropTypes.string.isRequired,
  onEnrolment:      PropTypes.func.isRequired,
  fetchVariantName: PropTypes.func,
  cacheGet:         PropTypes.func,
  cacheSet:         PropTypes.func
}

const Variant = (props) => {
  return props.children
}

const Loading = (props) => {
  return props.children
}

export {Experiment, Variant, Loading}
