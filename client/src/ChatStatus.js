import React from 'react';

import Circle from './Circle';

const ChatStatus = ({ users }) => {
  const typers = users
    .filter(u => u.isTyping)
    .map(u => <Circle key={u.id} color={u.color} />);

  if (typers.length === 0) {
    return <div />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {typers}{' '}
      <span
        style={{
          marginLeft: '0.25rem',
          fontStyle: 'italic',
          color: '#606F7B'
        }}
      >
        is typing...
      </span>
    </div>
  );
};

export default ChatStatus;
