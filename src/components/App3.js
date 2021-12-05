import React, { useState, createContext } from 'react';
import Child from './Child';

export const UserContext = createContext();

export default function App3() {
  const [username, setUsername] = useState('Jason');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <h1>App3</h1>
      <div>{username}</div>

      <hr />
      <Child />
    </UserContext.Provider>
  );
}
