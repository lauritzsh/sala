import React from 'react';

import Avatar from './Avatar';

const userToSymbol = (userId, users) => {
  const user = users.find(u => u.id === userId);

  if (user) {
    return user.symbol;
  }

  return '';
};

const Message = ({ body, symbol, userId }) => (
  <div style={{ display: 'flex', marginBottom: '1rem' }}>
    <div
      title={userId}
      style={{
        display: 'flex',
        width: '1rem',
        alignItems: 'center'
      }}
    >
      {symbol ? <Avatar symbol={symbol} /> : <Avatar left />}
    </div>
    <div style={{ flex: '1' }}>{body}</div>
  </div>
);

const Chat = ({ users, messages, bottomRef, style }) => {
  if (!messages) {
    return <div />;
  }

  const Messages = () =>
    messages.map(({ user_id, body }, i) => {
      const symbol = userToSymbol(user_id, users);

      return <Message key={i} body={body} symbol={symbol} userId={user_id} />;
    });

  return (
    <div style={style}>
      <Messages />
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
