import React, { Component } from 'react';
import Countries from './components/Countries';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    }
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      }
    });

    const filteredPopulation = this.calculateTotalPopulation(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation
    });
  }

  calculateTotalPopulation = countries => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);

    return totalPopulation;
  }

  handleChangeFilter = newText => {
    const { allCountries } = this.state;
    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter(country => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulation(filteredCountries);

    this.setState({
      filter: newText,
      filteredCountries,
      filteredPopulation
    });
  }

  render() {
    const { filteredCountries, filteredPopulation, filter } = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>

        <Header 
          filter={filter} 
          countryCount={filteredCountries.length} 
          totalPopulation={filteredPopulation}
          onChangeFilter={this.handleChangeFilter} />

        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}
