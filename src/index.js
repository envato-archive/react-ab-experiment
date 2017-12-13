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
    this.experimentKey = `experiment_${this.experimentId}`
    this.variantComponents = this.props.children
  }

  nullCache () {
    return {
      get: () => null,
      set: () => null
    }
  }

  cache () {
    if (typeof this.props.cache == 'undefined') {
      return this.nullCache()
    } else {
      return this.props.cache
    }
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
    let variantName = this.cache().get(this.experimentKey)
    if (variantName == null) {
      return (this.fetchVariantName() || this.chooseRandomVariantName()).then((variantName) => {
        this.props.onEnrolment(this.experimentId, variantName)
        this.cache().set(this.experimentKey, variantName)
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
  cache:            PropTypes.shape({
                      get: PropTypes.func,
                      set: PropTypes.func
                    })
}

const Variant = (props) => {
  return props.children
}

export {Experiment, Variant}
