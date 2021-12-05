import React, { useContext } from 'react';
import { UserContext } from './App3';

export default function Child() {
  const { username, setUsername } = useContext(UserContext);

  return (
    <div>
      <div>{username}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}
