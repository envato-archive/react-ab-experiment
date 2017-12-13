import React from 'react'
import PropTypes from 'prop-types'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      variantName: null
    }
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
    return this.props.fetchVariantName && this.props.fetchVariantName(this.props.experimentId)
  }

  chooseRandomVariantName () {
    const randomIndex = Math.floor(Math.random() * (this.props.children.length))
    const choosenVariantComponent = this.props.children[randomIndex]
    return Promise.resolve(choosenVariantComponent.props.name)
  }

  getVariantName () {
    const experimentKey = `experiment_${this.props.experimentId}`
    const variantName = this.cache().get(experimentKey)

    if (!variantName) {
      return (this.fetchVariantName() || this.chooseRandomVariantName()).then((variantName) => {
        this.props.onEnrolment(this.props.experimentId, variantName)
        this.cache().set(experimentKey, variantName)
        return variantName
      }).catch((err) => {
        const originalVariant = this.props.children[0]
        return originalVariant.props.name
      })
    } else {
      return Promise.resolve(variantName)
    }
  }

  componentDidMount () {
    this.getVariantName().then((variantName) => {
      this.setState({ loading: false, variantName: variantName })
    })
  }

  findVariantByName(name) {
    return this.props.children.find(v => v.props.name == name) || null
  }

  render () {
    return this.findVariantByName(this.state.variantName)
  }
}

Experiment.propTypes = {
  experimentId:     PropTypes.string.isRequired,
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
