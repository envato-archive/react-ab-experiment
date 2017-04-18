import React from 'react'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      variant: null
    }

    this.store = this.props.children.reduce((acc, child) => {
        acc[child.props.variant] = child
        return acc
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

  componentDidMount () {
    const variant = this.getVariant()

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
