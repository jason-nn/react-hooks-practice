import React, { useState, useEffect, useRef } from 'react';
import useForm from './hooks/useForm';
import useFetch from './hooks/useFetch';
import Hello from './components/Hello';

export default function App() {
  const [{ count, count2 }, setCount] = useState({ count: 10, count2: 20 });
  const [count3, setCount3] = useState(30);
  const [count4, setCount4] = useState(40);

  const [values, handleChange] = useForm({ email: '', name: '', password: '' });

  const [showHello, setShowHello] = useState(true);

  useEffect(() => {
    console.log('app render');
    // const onMouseMove = (e) => {
    //   console.log(e);
    // };
    // window.addEventListener('mousemove', onMouseMove);

    return () => {
      console.log('app cleanup');
      // window.removeEventListener('mousemove', onMouseMove);
    };
  }, [values.email, values.name]);

  useEffect(() => {
    console.log('mount1');
  }, []);

  useEffect(() => {
    console.log('mount2');
  }, []);

  const [triviaNum, setTriviaNum] = useState(
    localStorage.triviaNum ? parseInt(JSON.parse(localStorage.triviaNum)) : 0
  );
  const { data, loading } = useFetch(
    `http://numbersapi.com/${triviaNum}/trivia`
  );

  useEffect(() => {
    localStorage.triviaNum = JSON.stringify(triviaNum);
  }, [triviaNum]);

  const inputRef = useRef();

  const helloRef = useRef(() => console.log('hello'));

  return (
    <>
      <div>
        <div>{count}</div>
        <div>{count2}</div>
        <div>{count3}</div>
        <div>{count4}</div>
        <button
          onClick={() => {
            setCount((currentState) => ({
              ...currentState,
              // count2: currentState.count2,
              count: currentState.count + 1,
            }));
            setCount3((c) => c + 1);
            setCount4((c) => c + 1);
          }}
        >
          +
        </button>
      </div>

      <hr />

      <div>
        <input
          ref={inputRef}
          type="email"
          name="email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="name"
          name="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
        <div>{values.email}</div>
        <div>{values.name}</div>
        <div>{values.password}</div>
      </div>

      <hr />

      <div>
        <button onClick={() => setShowHello(!showHello)}>toggle</button>
        {showHello && <Hello />}
      </div>

      <div>
        <div>{loading ? 'loading...' : data}</div>

        <div>{triviaNum}</div>

        <button onClick={() => setTriviaNum(triviaNum + 1)}>+</button>
      </div>

      <div>
        <button
          onClick={() => {
            inputRef.current.focus();
            helloRef.current();
          }}
        >
          focus
        </button>
      </div>
    </>
  );
}
