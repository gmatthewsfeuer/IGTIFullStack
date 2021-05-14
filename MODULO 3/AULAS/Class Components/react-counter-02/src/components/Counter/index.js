import React, { Component } from 'react';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Value from './Value';
import Steps from './Steps';

// Para usar as classes como variáveis, o arquivo CSS deve ser 'nome-do-componente'.module.css
import css from './index.module.css';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 0,
      steps: 0
    }
  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter: (clickType === '+') ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1
    });
  }

  render() {
    const { currentCounter, steps } = this.state;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps steps={steps} />
      </div>
    )
  }
}
