import React from 'react';

import './index.css';

export default function Card({ children }) {
  return (
    <li className="card">
      {children}
    </li>
  )
}
