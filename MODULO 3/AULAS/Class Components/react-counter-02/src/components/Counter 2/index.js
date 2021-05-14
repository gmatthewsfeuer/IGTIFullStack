import React, { Component } from 'react';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Value from './Value';
import Steps from './Steps';

import './index.css';

export default class Counter2 extends Component {
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType);
  }

  render() {
    const { countValue, steps } = this.props;

    return (
      <div className="counterContainer">
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={countValue} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps steps={steps} />
      </div>
    )
  }
}
