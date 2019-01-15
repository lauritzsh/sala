import React from 'react';
import styled from 'styled-components';

import ChatMessages, { Props as ChatMessagesProps } from './ChatMessages';
import ChatStatus, { Props as ChatStatusProps } from './ChatStatus';
import ChatInput, { Props as ChatInputProps } from './ChatInput';

const Wrapper = styled.div`
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 2rem auto;
  grid-gap: 1rem;
`;

type Props = ChatMessagesProps & ChatStatusProps & ChatInputProps;

export default ({
  messages,
  users,
  typingUsers,
  onAddMessage,
  onTyping,
}: Props) => (
  <Wrapper>
    <ChatMessages messages={messages} users={users} />
    <ChatStatus typingUsers={typingUsers} />
    <ChatInput onAddMessage={onAddMessage} onTyping={onTyping} />
  </Wrapper>
);
