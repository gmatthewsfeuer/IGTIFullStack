import React, { Component } from 'react';
import Band from './components/Band';
import Counter from './components/Counter';
import Counter2 from './components/Counter 2';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 3,
      steps: 0,
    }
  }

  handleCount = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter: (clickType === '+') ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1
    });
  }

  render() {
    const { currentCounter, steps } = this.state;

    return (
      <>
        <h3>Band</h3>
        <Band />

        <h3>Counter com Estado Individual</h3>
        <Counter />
        <Counter />
        <Counter />

        <h3>Counter com Estado Compartilhado</h3>
        <Counter2 onCount={this.handleCount} countValue={currentCounter} steps={steps} />
        <Counter2 onCount={this.handleCount} countValue={currentCounter} steps={steps} />
        <Counter2 onCount={this.handleCount} countValue={currentCounter} steps={steps} />
      </>
    )
  }
}
