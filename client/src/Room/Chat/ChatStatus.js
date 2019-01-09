import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components/macro';

import Avatar from '../Avatar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Fade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default ({ users }) => (
  <Wrapper>
    <PoseGroup flipMove={false}>
      {users.map(u => (
        <Fade key={u.id}>
          <Avatar symbol={u.symbol} medium />
        </Fade>
      ))}
      {users.length > 0 && (
        <Fade
          key="info"
          css={`
            margin-left: 0.25rem;
          `}
        >
          is typing
        </Fade>
      )}
    </PoseGroup>
  </Wrapper>
);
