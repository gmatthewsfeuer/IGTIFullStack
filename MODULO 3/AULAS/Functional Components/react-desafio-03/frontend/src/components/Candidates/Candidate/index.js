import React from 'react';
import Picture from './Picture';
import Position from './Position';
import Info from './Info';

export default function Candidate({ previousVote, previousPercentage, position, candidate }) {
  const { id, name } = candidate;

  const imageSource = require(`../../../assets/images/${id}.jpg`);

  return (
    <>
      <Position position={position}/>
      <Picture imageSource={imageSource} description={name} />
      <Info candidate={candidate} previousVote={previousVote} previousPercentage={previousPercentage} />
    </>
  )
}
