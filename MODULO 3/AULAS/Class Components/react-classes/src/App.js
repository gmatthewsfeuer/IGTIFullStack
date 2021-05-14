import React, { Component } from 'react';

import { getNewTimestamp } from './helpers/dataTimeHelper';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    }
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getNewTimestamp());

    this.setState({ clickArray: newClickArray });
  }

  componentDidUpdate() {
    let clicks = this.state.clickArray.length.toString();

    document.title = `Clicks: ${clicks}`;
  }

  render() {
    const { clickArray } = this.state;

    return (
      <div className="main">
        <h1>
          React e <em>Class Components</em>
        </h1>

        <button onClick={this.handleClick}>Clique Aqui</button>

        <ul id="data">
          { clickArray.map(item => <li key={item}>{item}</li>) }
        </ul>
      </div>
    )
  }
}
