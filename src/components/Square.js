import React from 'react';
import useCountRenders from '../hooks/useCountRenders';

export default React.memo(function Square({ increment, n }) {
  useCountRenders();
  return (
    <>
      <button onClick={() => increment(n)}>+{n}</button>
    </>
  );
});
