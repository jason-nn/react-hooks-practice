import { useEffect, useState, useRef } from 'react';

export default function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: false });

  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true });
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
        if (isCurrent.current) {
          setState({ data: data, loading: false });
        }
      });
  }, [url]);

  return state;
}
