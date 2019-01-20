import React, { useState, useEffect, useRef } from 'react';
import posed, { PoseGroup } from 'react-pose';
import 'styled-components/macro';

import { Box } from '../../shared';
import Avatar from '../Avatar';

const Jump = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
});

type User = {
  id: string;
  symbol: string;
};

const userToSymbol = (users: User[], userId?: string) => {
  const user = users.find(u => u.id === userId);

  return user ? user.symbol : '';
};

type Message = {
  body: string;
  symbol: string;
  userId?: string; // FIXME: should not be optional
  user_id?: string; // FIXME: should be userId
  // the reason is because the backend sends `user_id`
  // so need to figure out how it can send `userId` instead
  // but still use `user_id` internally
};

const Message = ({ body, symbol, userId }: Message) => (
  <>
    <Box
      title={userId}
      css={`
        display: flex;
        width: 1rem;
        align-items: center;
      `}
    >
      {symbol && <Avatar symbol={symbol} />}
    </Box>
    <Box
      css={`
        flex: 1;
      `}
    >
      {body}
    </Box>
  </>
);

export type Props = {
  users: User[];
  messages: Message[];
};

export default ({ users, messages }: Props) => {
  const bottomRef = useRef<HTMLInputElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(
    () => {
      if (isAtBottom && bottomRef.current) {
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
    <Box
      css={`
        overflow: hidden;

        :hover {
          overflow: auto;
        }
      `}
      onScroll={event => {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = event.target as HTMLDivElement;
        setIsAtBottom(scrollHeight - scrollTop === clientHeight);
      }}
    >
      <div>
        <PoseGroup>
          {messages.map(({ user_id, body }, i) => {
            const symbol = userToSymbol(users, user_id);

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
    </Box>
  );
};
