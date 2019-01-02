import React from 'react';
import { Router, Redirect } from '@reach/router';
import { createGlobalStyle } from 'styled-components';
import 'react-input-range/lib/css/index.css';

import Room from './Room';

const GlobalStyle = createGlobalStyle` 
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #22292f;
    color: white;
  }
`;

// Might result in same id twice but unlikely
const Home = () => {
  const randomId = Math.random()
    .toString(36)
    .substring(2);

  return <Redirect to={`s/${randomId}`} noThrow />;
};

const NotFound = () => <div>Wrong turn, mate</div>;

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Home path="/" />
      <Room path="s/:name" />
      <NotFound default />
    </Router>
  </>
);

export default App;
