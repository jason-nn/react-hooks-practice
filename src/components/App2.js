import React, { useState, useCallback } from 'react';
import Hello2 from './Hello2';
import Square from './Square';

export default function App2() {
  const [count, setCount] = useState(0);

  const increment = useCallback(
    (n) => {
      setCount((count) => count + n);
    },
    [setCount]
  );

  const nums = [7, 26, 1];

  return (
    <>
      <Hello2 increment={increment} />
      <div>count: {count}</div>
      {nums.map((n, index) => {
        return <Square increment={increment} n={n} key={index} />;
      })}
    </>
  );
}
