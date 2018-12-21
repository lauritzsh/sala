import React from 'react';

import Avatar from './Avatar';

const ChatStatus = ({ users }) => {
  const typers = users
    .filter(u => u.isTyping)
    .map(u => <Avatar key={u.id} symbol={u.symbol} />);

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
