import React from 'react';
import { Router } from '@reach/router';
import { createGlobalStyle } from 'styled-components';
import 'react-input-range/lib/css/index.css';

import Home from './Home';
import Privacy from './Privacy';
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
  
  p {
    margin-top: 0;
  }

  a {
    color: white;
  }
`;

const NotFound = () => <div>Wrong turn, mate</div>;

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Home path="/" />
      <Privacy path="privacy" />
      <Room path="s/:name" />
      <NotFound default />
    </Router>
  </>
);

export default App;
