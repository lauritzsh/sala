import React from 'react';
import styled from 'styled-components/macro';

import Container from './Container';
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default () => {
  document.title = '404';

  return (
    <Wrapper>
      <Header />
      <Container narrow css="flex: 1;">
        <h1>Not found 😳</h1>
        <p>
          We are not sure what is supposed to be here but we know for certain it
          is gone. Sorry.
        </p>
      </Container>
      <Footer />
    </Wrapper>
  );
};
