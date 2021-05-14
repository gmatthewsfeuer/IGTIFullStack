import React from 'react';

import './index.css';

const STARS = {
  empty: '☆',
  full: '★',
}

const MAX_STARS = 10;

export default function Popularity({ popularity }) {
  const fullStars = STARS.full.repeat(popularity);
  const emptyStars = STARS.empty.repeat(MAX_STARS - popularity);

  return <span className="popularity">{fullStars}{emptyStars}</span>;
}
