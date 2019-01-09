import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components/macro';

import Avatar from './Avatar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Fade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default ({ users }) => (
  <Wrapper>
    <PoseGroup>
      {users.map(({ id, symbol }) => (
        <Fade key={id}>
          <Avatar css="margin-right: 0.5rem;" big symbol={symbol} />
        </Fade>
      ))}
    </PoseGroup>
  </Wrapper>
);
