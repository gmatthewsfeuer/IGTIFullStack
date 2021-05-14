import React, { Component } from 'react';

import { formatNumber } from '../../../helpers/formatHelpers';

import './index.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag, population } = country;

    return (
      <div className="border country">
        <div className="flag-container">
          <img className="flag" src={flag} alt={`Bandeira do(a) ${name}`} />
        </div>
        <div className="info">
          <span><b>{name}</b></span>
          <p>População: {formatNumber(population)}</p>
        </div>
      </div>
    )
  }
}
