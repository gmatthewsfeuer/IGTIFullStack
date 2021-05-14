import React from 'react';
import Name from './Name';
import Votes from './Votes';
import Percentage from './Percentage';
import Popularity from './Popularity';

import './index.css';

export default function Info({ candidate, previousVote, previousPercentage }) {
  const { name, votes, percentage, popularity } = candidate;

  return (
    <div className="info">
      <Name name={name} />
      <Votes votes={votes} previousVote={previousVote} />
      <Percentage percentage={percentage} previousPercentage={previousPercentage} />
      <Popularity popularity={popularity} />
    </div>
  );
}
