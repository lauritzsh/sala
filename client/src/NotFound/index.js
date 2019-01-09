import React from 'react';
import styled from 'styled-components/macro';

import { Container, Footer, Header } from 'shared';

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
        <h1>
          Not found{' '}
          <span role="img" aria-label="Surprised">
            😳
          </span>
        </h1>
        <p>
          We are not sure what is supposed to be here but we know for certain it
          is gone. Sorry.
        </p>
      </Container>
      <Footer />
    </Wrapper>
  );
};
