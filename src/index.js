import React from 'react'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.variants = React.Children.toArray(this.props.children)
    this.state = {}
  }

  componentDidMount() {
    const variant = this.variants[Math.floor(Math.random() * this.variants.length)]

    this.setState({
      variant: variant
    })
  }

  render () {
    if (!('variant' in this.state)) {
      return null
    }

    return(
      <Variant variant={this.state.variant} />
    )
  }
}

class Variant extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return <div>{this.props.variant}</div>
  }
}

export {Experiment, Variant}
