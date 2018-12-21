import React, { useEffect, useRef, useReducer } from 'react';
import produce from 'immer';

import ChatMessages from './ChatMessages';
import ChatStatus from './ChatStatus';
import Input from './Input';
import RoomChannel from './ChatService';
import RoomStatus from './RoomStatus';
import VideoInput from './VideoInput';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      draft.chat.push(action.payload);
      return;
    }

    case 'USER_JOIN': {
      draft.users.push(action.payload);
      return;
    }

    case 'USER_LEAVE': {
      draft.users = draft.users.filter(u => u.id !== action.payload);
      return;
    }

    case 'USER_TYPING': {
      const { userId, isTyping } = action.payload;
      draft.users.forEach(u => {
        if (u.id === userId) {
          u.isTyping = isTyping;
        }
      });

      return;
    }

    default:
      return;
  }
});

const Chat = ({ initialChat, initialUsers }) => {
  const bottomRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    chat: initialChat,
    users: initialUsers
  });
  const { chat, users } = state;

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, []);

  function handleMessage(message) {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    scrollToBottom();
  }

  function handleUserJoin(user) {
    dispatch({ type: 'USER_JOIN', payload: user });
  }

  function handleUserLeave({ userId }) {
    dispatch({ type: 'USER_LEAVE', payload: userId });
  }

  function handleUserTyping({ isTyping, userId }) {
    dispatch({ type: 'USER_TYPING', payload: { isTyping, userId } });
  }

  useEffect(() => {
    RoomChannel.onMessage(handleMessage)
      .onUserJoin(handleUserJoin)
      .onUserLeave(handleUserLeave)
      .onUserTyping(handleUserTyping);
  });

  return (
    <div
      style={{
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: 'auto 6rem 1fr 2rem 6rem'
      }}
    >
      <VideoInput />
      <RoomStatus users={users} />
      <ChatMessages
        style={{ overflow: 'auto', paddingRight: '1rem' }}
        bottomRef={bottomRef}
        messages={chat}
        users={users}
      />
      <ChatStatus users={users} />
      <Input
        pushMessage={body => RoomChannel.pushMessage(body)}
        pushIsTyping={isTyping => RoomChannel.pushIsTyping(isTyping)}
      />
    </div>
  );
};

export default Chat;
