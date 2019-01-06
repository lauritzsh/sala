import React, { useState, useEffect, useRef } from 'react';
import posed, { PoseGroup } from 'react-pose';
import 'styled-components/macro';

import Avatar from './Avatar';

const Jump = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
});

const userToSymbol = (userId, users) => {
  const user = users.find(u => u.id === userId);

  return user ? user.symbol : '';
};

const Message = ({ body, symbol, userId }) => (
  <>
    <div
      title={userId}
      css={`
        display: flex;
        width: 1rem;
        align-items: center;
      `}
    >
      {symbol && <Avatar symbol={symbol} />}
    </div>
    <div
      css={`
        flex: 1;
      `}
    >
      {body}
    </div>
  </>
);

export default ({ users, messages }) => {
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(
    () => {
      if (isAtBottom) {
        bottomRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    },
    [messages, isAtBottom],
  );

  return (
    <div
      css={`
        overflow: hidden;

        :hover {
          overflow: auto;
        }
      `}
      onScroll={event => {
        event.preventDefault();
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        if (scrollHeight - scrollTop === clientHeight) {
          setIsAtBottom(true);
        } else {
        }
      }}
    >
      <div>
        <PoseGroup>
          {messages.map(({ user_id, body }, i) => {
            const symbol = userToSymbol(user_id, users);

            return (
              <Jump
                key={i}
                css={`
                  display: flex;
                  margin-bottom: 0.5rem;

                  :last-of-type {
                    margin-bottom: 0;
                  }
                `}
              >
                <Message body={body} symbol={symbol} userId={user_id} />
              </Jump>
            );
          })}
        </PoseGroup>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
