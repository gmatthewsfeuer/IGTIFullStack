import React, { Component } from 'react';

import { formatNumber } from '../../helpers/formatHelpers';

import './index.css';

export default class Header extends Component {
  handleInputChange = event => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  }

  render() {
    const { filter, countryCount, totalPopulation } = this.props;

    return (
      <header className="flexRow">
        <input placeholder="Filtro" type="text" value={filter} onChange={this.handleInputChange} /> | 
        <span className="countries">Países: <strong>{countryCount}</strong></span> |
        <span className="population">População: <strong>{formatNumber(totalPopulation)}</strong></span>
      </header>
    )
  }
}
