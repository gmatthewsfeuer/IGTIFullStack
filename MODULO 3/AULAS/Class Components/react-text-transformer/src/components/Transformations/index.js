import React, { Component } from 'react'

export default class Transformations extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <h3 className="center">Transformações</h3>

        {children}
      </div>
    )
  }
}
