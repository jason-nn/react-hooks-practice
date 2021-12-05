import React from 'react';
import useCountRenders from '../hooks/useCountRenders';

export default React.memo(function Hello2({ increment }) {
  useCountRenders();
  return (
    <>
      <button onClick={() => increment(5)}>+</button>
    </>
  );
});
