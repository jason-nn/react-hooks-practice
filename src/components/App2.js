import React, { useState, useCallback, useMemo } from 'react';
import Hello2 from './Hello2';
import Square from './Square';
import useFetch from '../hooks/useFetch';

export default function App2() {
  const [count, setCount] = useState(0);

  const increment = useCallback(
    (n) => {
      setCount((count) => count + n);
    },
    [setCount]
  );

  const nums = [7, 26, 1];

  const { data, loading } = useFetch(
    'https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json'
  );

  // since computeLongestWord is a pure function and doesn't have any dependencies, it could be put outside the component
  // after imports

  const computeLongestWord = useCallback((arr) => {
    console.log('computing longest word');

    if (!arr) {
      return [];
    }

    let longestWord = '';

    JSON.parse(arr).forEach((sentence) => {
      sentence.split(' ').forEach((word) => {
        if (word.length > longestWord.length) {
          longestWord = word;
        }
      });
    });

    return longestWord;
  }, []);

  const longestWord = useMemo(
    () => computeLongestWord(data),
    [data, computeLongestWord]
  );

  return (
    <>
      <Hello2 increment={increment} />
      <div>count: {count}</div>
      {nums.map((n, index) => {
        return <Square increment={increment} n={n} key={index} />;
      })}
      <div>{longestWord}</div>
    </>
  );
}
