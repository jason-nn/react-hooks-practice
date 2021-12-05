import React, { useState, useCallback, useMemo, useReducer } from 'react';
import Hello2 from './Hello2';
import Square from './Square';
import useFetch from '../hooks/useFetch';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const todoreducer = (state, action) => {
  switch (action.type) {
    case 'add-todo':
      return {
        todos: [...state.todos, { text: action.payload, completed: false }],
        todocount: state.todocount + 1,
      };
    case 'toggle-todo':
      return {
        todos: state.todos.map((t, index) =>
          index == action.index ? { ...t, completed: !t.completed } : t
        ),
        todocount: state.todocount,
      };
    default:
      return state;
  }
};

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

  const [reducerCount, reducerDispatch] = useReducer(reducer, 0);

  const [text, setText] = useState('');
  const [{ todos, todocount }, tododispatch] = useReducer(todoreducer, {
    todos: [],
    todocount: 0,
  });

  return (
    <>
      <Hello2 increment={increment} />
      <div>count: {count}</div>
      {nums.map((n, index) => {
        return <Square increment={increment} n={n} key={index} />;
      })}
      <div>{longestWord}</div>

      <hr />
      <div>
        <div>{reducerCount}</div>
        <button onClick={() => reducerDispatch({ type: 'increment' })}>
          +
        </button>
        <button onClick={() => reducerDispatch({ type: 'decrement' })}>
          -
        </button>
      </div>

      <hr />

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tododispatch({ type: 'add-todo', payload: text });
            setText('');
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        {/* <div>
          <pre>{JSON.stringify(todos, null, 2)}</pre>
        </div> */}
        <div>
          <div>todos: {todocount}</div>
          {todos.map((t, i) => (
            <div
              key={i}
              onClick={() => tododispatch({ type: 'toggle-todo', index: i })}
              style={{
                textDecoration: t.completed ? 'line-through' : '',
              }}
            >
              {t.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
