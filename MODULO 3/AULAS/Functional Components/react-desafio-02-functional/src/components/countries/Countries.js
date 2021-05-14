import React from 'react';
import Country from './Country';
import FlipMove from 'react-flip-move';

import css from './countries.module.css';

export default function Countries({ countries }) {
	return (
		<div className={`${css.border} ${css.flexRow}`}>
			<FlipMove style={style}>
				{countries.map((country) => {
					return (
            <div key={country.id}>
              <Country country={country} />
            </div>
          );
				})}
			</FlipMove>
		</div>
	);
}

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center'
}
