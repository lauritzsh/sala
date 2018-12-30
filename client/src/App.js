import React from 'react';
import { Router, Redirect } from '@reach/router';

import './App.css';
import Room from './Room';

// Might result in same id twice but unlikely
const Home = () => {
  const randomId = Math.random()
    .toString(36)
    .substring(2);

  return <Redirect to={`s/${randomId}`} noThrow />;
};

const NotFound = () => <div>Wrong turn, mate</div>;

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Room path="s/:name" />
      <NotFound default />
    </Router>
  );
};

export default App;
