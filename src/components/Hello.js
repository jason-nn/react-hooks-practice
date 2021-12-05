import React, { useEffect, useRef } from 'react';

export default function Hello() {
  useEffect(() => {
    console.log('hello mount');
    return () => {
      console.log('hello unmount');
    };
  }, []);

  const renders = useRef(0);

  console.log('hello renders: ', renders.current++);

  return <>Hello</>;
}
