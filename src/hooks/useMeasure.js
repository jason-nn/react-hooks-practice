import { useRef, useState, useLayoutEffect } from 'react';

export default function useMeasure(dependencies) {
  const [refDetails, setRefDetails] = useState({});
  const myRef = useRef();

  useLayoutEffect(() => {
    setRefDetails(myRef.current.getBoundingClientRect());
  }, [...dependencies]);

  return [refDetails, myRef];
}
