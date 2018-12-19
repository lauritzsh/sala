import React, { useEffect, useRef, useReducer } from 'react';
import { Router, Link } from '@reach/router';

import './App.css';
import Room from './Room';

const Home = () => <div path="/">/s/:name</div>;

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
