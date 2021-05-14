import React, { useState, useEffect } from 'react';

import { getNewTimestamp } from './helpers/dataTimeHelper';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  }, [clickArray]);

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    
    newClickArray.push(getNewTimestamp());

    setClickArray(newClickArray);
  }

  return (
    <div className="main">
        <h1>
          React e <em>Hooks</em>
        </h1>

        <button onClick={handleClick}>Clique Aqui</button>

        <ul id="data">
          { clickArray.map(item => <li key={item}>{item}</li>) }
        </ul>
      </div>
  );
}
