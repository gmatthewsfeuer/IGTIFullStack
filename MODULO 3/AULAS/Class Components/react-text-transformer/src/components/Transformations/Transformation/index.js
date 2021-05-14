import React, { Component } from 'react'
import Input from '../../Input'

export default class Transformation extends Component {
  render() {
    const { id, description, value } = this.props;

    return (
      <Input
        id={id}
        description={description}
        value={value}
        readOnly
        allowCopy
      />
    )
  }
}
