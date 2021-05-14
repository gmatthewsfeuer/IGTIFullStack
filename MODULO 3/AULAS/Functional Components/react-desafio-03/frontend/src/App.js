import React, { useState, useEffect } from 'react';
import Candidates from './components/Candidates';
import Header from './components/Header';
import Spinner from './components/Spinner';

export default function App() {
	const [candidates, setCandidates] = useState([]);
	const [previousVotes, setPreviousVotes] = useState([]);
	const [previousPercentage, setPreviousPercentage] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			fetch('http://localhost:8080/votes')
				.then((res) => res.json())
				.then((json) => {
					const newPreviousVotes = candidates.map(({ id, votes }) => {
						return { id, votes };
					});

					const newPreviousPercentage = candidates.map(({ id, percentage }) => {
						return { id, percentage };
					});

					setCandidates(json.candidates);
					setPreviousVotes(newPreviousVotes);
					setPreviousPercentage(newPreviousPercentage);
				})
				.catch((err) => console.log(err));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [candidates]);

	return (
		<div className="container">
			<Header>Votação</Header>
			{candidates.length === 0 && <Spinner description="Carregando" />}
			<Candidates
				previousVotes={previousVotes}
				previousPercentage={previousPercentage}
				candidates={candidates}
			/>
		</div>
	);
}
