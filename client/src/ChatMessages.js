import React, { useState, useEffect, useRef } from 'react';
import posed, { PoseGroup } from 'react-pose';

import Avatar from './Avatar';

const Jump = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
});

const userToSymbol = (userId, users) => {
  const user = users.find(u => u.id === userId);

  if (user) {
    return user.symbol;
  }

  return '';
};

const Message = ({ body, symbol, userId }) => (
  <>
    <div
      title={userId}
      style={{
        display: 'flex',
        width: '1rem',
        alignItems: 'center',
      }}
    >
      {symbol ? <Avatar symbol={symbol} /> : <Avatar left />}
    </div>
    <div style={{ flex: '1' }}>{body}</div>
  </>
);

export default ({ users, messages, style }) => {
  if (!messages) {
    return <div />;
  }

  const _messages = messages.map(({ user_id, body }, i) => {
    const symbol = userToSymbol(user_id, users);

    return (
      <Jump key={i} className="chat-message">
        <Message body={body} symbol={symbol} userId={user_id} />
      </Jump>
    );
  });

  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(
    () => {
      if (isAtBottom) {
        bottomRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
    [messages, isAtBottom],
  );

  return (
    <div
      style={style}
      onScroll={event => {
        const { target } = event;
        const { scrollHeight, scrollTop, clientHeight } = target;
        setIsAtBottom(scrollHeight - scrollTop === clientHeight);
      }}
    >
      <div>
        <PoseGroup>{_messages}</PoseGroup>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
