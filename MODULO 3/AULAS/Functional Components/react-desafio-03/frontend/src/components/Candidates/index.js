import React from 'react';
import Card from '../Card';
import Candidate from './Candidate';
import FlipMove from 'react-flip-move';

import './index.css';

export default function Candidates({ candidates, previousVotes, previousPercentage }) {
	return (
		<ul className="list">
			<FlipMove>
				{candidates.map((candidate, index) => {
					const { id } = candidate;

					const previousVoteObject = previousVotes.find(item => item.id === id);
					const previousVote = !!previousVoteObject ? previousVoteObject.votes : 0;
					
					const previousPercentageObject = previousPercentage.find(item => item.id === id);
					const prevPercentage = !!previousPercentageObject ? previousPercentageObject.percentage : 0;

					return (
						<div key={id}>
							<Card>
								<Candidate previousVote={previousVote} previousPercentage={prevPercentage} position={index + 1} candidate={candidate} />
							</Card>
						</div>
					);
				})}
			</FlipMove>
		</ul>
	);
}
