import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import { createGlobalStyle } from 'styled-components';
import 'react-input-range/lib/css/index.css';

const Home = lazy(() => import('./Home'));
const Privacy = lazy(() => import('./Privacy'));
const Room = lazy(() => import('./Room'));
const NotFound = lazy(() => import('./NotFound'));

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
    color: #22292F;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Suspense fallback={null}>
      <Router>
        <Home path="/" />
        <Privacy path="privacy" />
        <Room path="s/:name" />
        <NotFound default />
      </Router>
    </Suspense>
  </>
);

export default App;
