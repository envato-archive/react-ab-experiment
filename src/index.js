import React from 'react'
import PropTypes from 'prop-types'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      variant: null
    }

    this.experimentId = this.props.id
    this.variantComponents = this.props.children
  }

  experimentKey () {
    return `experiment_${this.experimentId}`
  }

  cacheGet (experimentKey) {
    if (typeof this.props.cacheGet == "undefined"){
      return null
    } else {
      return this.props.cacheGet(experimentKey)
    }
  }

  cacheSet (experimentKey, variantName) {
    return this.props.cacheSet && this.props.cacheSet(experimentKey, variantName)
  }

  fetchVariantName() {
    return this.props.fetchVariantName && this.props.fetchVariantName(this.experimentId)
  }

  chooseRandomVariantName () {
    const randomIndex = Math.floor(Math.random() * (this.variantComponents.length))
    const choosenVariantComponent = this.variantComponents[randomIndex]
    return Promise.resolve(choosenVariantComponent.props.name)
  }

  getVariantName () {
    let variantName = this.cacheGet(this.experimentKey())
    if (variantName == null) {
      return (this.fetchVariantName() || this.chooseRandomVariantName()).then((variantName) => {
        this.props.onEnrolment(this.experimentId, variantName)
        this.cacheSet(this.experimentKey(), variantName)
        return variantName
      }).catch((err) => {
        const originalVariant = this.variantComponents[0]
        return originalVariant.props.name
      })
    } else {
      return Promise.resolve(variantName)
    }
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

export {Experiment, Variant}
