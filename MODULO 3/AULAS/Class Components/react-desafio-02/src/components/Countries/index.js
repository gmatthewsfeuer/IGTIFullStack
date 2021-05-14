import React, { Component } from 'react'
import Country from './Country';

import './index.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;

    return (
      <ul className="border countries">
        {countries.map(country => {
          return (
            <li key={country.id}>
              <Country country={country} />
            </li>
          );
        })}
      </ul>
    )
  }
}
