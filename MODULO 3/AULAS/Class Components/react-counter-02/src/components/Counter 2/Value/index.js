import React, { Component } from 'react';

export default class Value extends Component {
  render() {
    return <span className="counterValue">{this.props.value}</span>
  }
}

