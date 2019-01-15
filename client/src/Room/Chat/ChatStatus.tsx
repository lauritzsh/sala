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

type User = {
  id: string;
  symbol: string;
};

export type Props = {
  typingUsers: User[];
};

export default ({ typingUsers }: Props) => {
  return (
    <Wrapper>
      <PoseGroup flipMove={false}>
        {typingUsers.map((u, index) => (
          <>
            <Fade key={u.id}>
              <Avatar symbol={u.symbol} medium />
            </Fade>
            {index === typingUsers.length - 1 && (
              <Fade
                key="info"
                css={`
                  margin-left: 0.25rem;
                `}
              >
                is typing
              </Fade>
            )}
          </>
        ))}
      </PoseGroup>
    </Wrapper>
  );
};
