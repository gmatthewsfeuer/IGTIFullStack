import React from 'react';
import CountUp from 'react-countup';

import './index.css';

export default function Percentage({ percentage, previousPercentage }) {
  return (
		<span className="percentage">
			<CountUp
				start={previousPercentage || 0}
				end={percentage}
        duration={0.6}
        decimal=","
        decimals={2}
        suffix="%"
			>
				{({ countUpRef }) => (
					<div>
						<span ref={countUpRef} />
					</div>
				)}
			</CountUp>
		</span>
	);
}
