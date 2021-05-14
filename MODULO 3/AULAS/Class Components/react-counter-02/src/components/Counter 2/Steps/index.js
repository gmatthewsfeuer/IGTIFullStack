import React, { Component } from 'react';

export default class Steps extends Component {
  render() {
    return <span className="counterValue">({this.props.steps})</span>
  }
}
