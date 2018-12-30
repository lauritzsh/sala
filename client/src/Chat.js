import React from 'react';

import ChatMessages from './ChatMessages';
import ChatStatus from './ChatStatus';
import ChatInput from './ChatInput';

export default ({
  messages,
  users,
  typingUsers,
  onAddMessage,
  onTyping,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '1fr 2rem 6rem',
        gridGap: '1rem',
      }}
    >
      <ChatMessages
        style={{ overflow: 'auto' }}
        messages={messages}
        users={users}
      />
      <ChatStatus users={typingUsers} />
      <ChatInput onAddMessage={onAddMessage} onTyping={onTyping} />
    </div>
  );
};
