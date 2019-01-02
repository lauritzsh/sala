import React from 'react';
import styled from 'styled-components';

import ChatMessages from './ChatMessages';
import ChatStatus from './ChatStatus';
import ChatInput from './ChatInput';

const Wrapper = styled.div`
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 2rem auto;
  grid-gap: 1rem;
`;

export default ({ messages, users, typingUsers, onAddMessage, onTyping }) => (
  <Wrapper>
    <ChatMessages messages={messages} users={users} />
    <ChatStatus users={typingUsers} />
    <ChatInput onAddMessage={onAddMessage} onTyping={onTyping} />
  </Wrapper>
);
