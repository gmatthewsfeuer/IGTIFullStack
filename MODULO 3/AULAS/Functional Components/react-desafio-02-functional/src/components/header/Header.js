import React from 'react';
import CountUp from 'react-countup';

import css from './header.module.css';

export default function Header({
  filter,
  previousCountryCount,
  countryCount,
  totalPopulation,
  previousPopulation,
	onChangeFilter,
}) {
	const handleInputChange = (event) => {
		const newText = event.target.value;

		onChangeFilter(newText);
	};

	return (
		<div className={css.flexRow}>
			<input
				placeholder="Filtro"
				type="text"
				value={filter}
				onChange={handleInputChange}
			/>{' '}
			|
			<span className={css.countries}>
				Países: 
        <CountUp
					start={previousCountryCount || 0}
					end={countryCount}
					duration={0.6}
					separator="."
				>
					{({ countUpRef }) => (
						<div>
							<strong><span ref={countUpRef} /></strong>
						</div>
					)}
				</CountUp>
			</span>{' '}
			|
			<span className={css.population}>
				População: 
				<CountUp
					start={previousPopulation || 0}
					end={totalPopulation}
					duration={0.6}
					separator="."
				>
					{({ countUpRef }) => (
						<div>
							<strong><span ref={countUpRef} /></strong>
						</div>
					)}
				</CountUp>
			</span>
		</div>
	);
}
