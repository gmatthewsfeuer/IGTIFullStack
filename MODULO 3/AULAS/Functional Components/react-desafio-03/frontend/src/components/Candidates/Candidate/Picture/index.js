import React from 'react';

import './index.css';

export default function Picture({ imageSource, description }) {
  return (
    <img src={imageSource} alt={description} title={description}/>
  )
}
