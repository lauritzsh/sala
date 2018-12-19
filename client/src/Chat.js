import React from 'react';

import Circle from './Circle';

const userToColor = (userId, users) => {
  const user = users.find(u => u.id === userId);

  if (user) {
    return user.color;
  }

  return '';
};

const Message = ({ body, color, userId }) => (
  <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
    <div
      title={userId}
      style={{
        display: 'flex',
        marginRight: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {color ? <Circle color={color} /> : <Circle border="#8795A1" />}
    </div>
    <div>{body}</div>
  </div>
);

const Chat = ({ users, messages, bottomRef }) => {
  if (!messages) {
    return <div />;
  }

  const Messages = () =>
    messages.map(({ user_id, body }, i) => {
      const color = userToColor(user_id, users);

      return <Message key={i} body={body} color={color} userId={user_id} />;
    });

  return (
    <div
      style={{
        overflow: 'auto',
        paddingRight: '1rem'
      }}
    >
      <Messages />
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
