import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;
  width: 96rem;
`;

const Inner = styled.div`
  flex: 1;
  margin: 0 auto;
  ${props => props.narrow && 'width: 48rem;'}
`;

export default ({ children, narrow }) => (
  <Outer>
    <Header />
    <Inner narrow={narrow}>{children}</Inner>
    <Footer />
  </Outer>
);
