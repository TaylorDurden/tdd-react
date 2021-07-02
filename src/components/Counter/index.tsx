import React, { useState } from 'react';
import './index.css';

function Counter() {
  const [counterValue, setCountValue] = useState(0);
  const [inputNumberValue, setInputNumberValue] = useState(1);

  const addCounter = () => {
    setCountValue(counterValue + inputNumberValue);
  };

  const subtractCounter = () => {
    setCountValue(counterValue - inputNumberValue);
  };

  return (
    <div>
      <h1 data-testid="header">My Counter</h1>
      <h2 
        data-testid="counter" 
        className={`${counterValue >= 100 ? 'green' : ''}${counterValue <= -100 ? 'red' : ''}`}>
        {counterValue}
      </h2>
      <button data-testid="subtract-btn" onClick={subtractCounter}>-</button>
      <input
        data-testid="input-number"
        type="number"
        value={inputNumberValue}
        className="text-center"
        onChange={(e) => {
          setInputNumberValue(Number(e.target.value));
        }}
      />
      <button data-testid="add-btn" onClick={addCounter}>+</button>
    </div>
  );
}

export default Counter;