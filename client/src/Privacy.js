import React from 'react';
import 'styled-components/macro';

import Container from './Container';
import Header from './Header';
import Footer from './Footer';

export default () => (
  <div
    css={`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `}
  >
    <Header />
    <Container narrow css="flex: 1;">
      <h1>Privacy policy</h1>
      <p>
        SSL is used to ensure everything is encrypted between you and the
        server.
      </p>
      <p>
        We do not use ads or any analytical tools such as Google Analytics. The
        server might log your IP address when you visit the website.
      </p>
      <p>
        If you want to know more, please write to{' '}
        <a href="mailto:support@sala.com">support@sala.com</a>.
      </p>
    </Container>
    <Footer />
  </div>
);
