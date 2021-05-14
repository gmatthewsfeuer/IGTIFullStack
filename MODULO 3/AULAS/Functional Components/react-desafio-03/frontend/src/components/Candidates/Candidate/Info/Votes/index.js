import React from 'react';
import CountUp from 'react-countup';

import './index.css';

export default function Votes({ votes, previousVote }) {
	return (
		<span className="votes">
			<CountUp
				start={previousVote || 0}
				end={votes}
				duration={0.6}
				separator="."
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
