import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
	const [allCountries, setAllCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [previousCountries, setPreviousCountries] = useState(0);
  const [previousPopulation, setPreviousPopulation] = useState(0);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const fetchCountries = async () => {
			const res = await fetch('https://restcountries.eu/rest/v2/all');
			const json = await res.json();

			const allCountries = json.map(
				({ name, numericCode, flag, population }) => {
					return {
						id: numericCode,
						name,
						filterName: name.toLowerCase(),
						flag,
						population,
					};
				}
      );

      const filteredPopulation = calculateTotalPopulationFrom(allCountries);

      setAllCountries(allCountries);
      setFilteredCountries([...allCountries]);
      setFilteredPopulation(filteredPopulation);
    };
    
    fetchCountries();
	}, []);

	const calculateTotalPopulationFrom = (countries) => {
		const totalPopulation = countries.reduce((accumulator, current) => {
			return accumulator + current.population;
		}, 0);

		return totalPopulation;
	};

	const handleChangeFilter = (newText) => {
		setFilter(newText);

		const filterLowerCase = newText.toLowerCase();

		const newFilteredCountries = allCountries.filter((country) => {
			return country.filterName.includes(filterLowerCase);
		});

		const newFilteredPopulation = calculateTotalPopulationFrom(newFilteredCountries);

    setPreviousCountries(filteredCountries.length);
    setFilteredCountries(newFilteredCountries);
    setPreviousPopulation(filteredPopulation);
    setFilteredPopulation(newFilteredPopulation);
	};

	return (
		<div className="container">
			<h1 style={styles.centeredTitle}>React Countries</h1>

			<Header
        filter={filter}
        previousCountryCount={previousCountries}
        countryCount={filteredCountries.length}
        previousPopulation={previousPopulation}
				totalPopulation={filteredPopulation}
				onChangeFilter={handleChangeFilter}
			/>

			<Countries countries={filteredCountries} />
		</div>
	);
}

const styles = {
	centeredTitle: {
		textAlign: 'center',
	},
};
