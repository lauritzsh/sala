import React, { useEffect, useRef, useReducer } from 'react';
import produce from 'immer';

import RoomChannel from './ChatService';
import RoomStatus from './RoomStatus';
import ChatStatus from './ChatStatus';
import Chat from './Chat';
import Input from './Input';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'JOIN_REQUEST':
      return { isLoading: true, error: null };

    case 'JOIN_SUCCESS':
      return { ...action.payload, isLoading: false, error: null };

    case 'JOIN_FAILURE':
      return { isLoading: false, error: action.payload };

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

const Room = ({ name }) => {
  const bottomRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    error: null
  });
  const { isLoading, chat, users } = state;

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  useEffect(
    () => {
      dispatch({ type: 'JOIN_REQUEST' });

      RoomChannel.join(name, {
        onSuccess(room) {
          dispatch({ type: 'JOIN_SUCCESS', payload: room });
          scrollToBottom();
        },
        onError(error) {
          dispatch({ type: 'JOIN_FAILURE', payload: error });
          console.error('No bueno:', error);
        }
      });

      return () => {
        dispatch({ type: 'LEAVE' });

        RoomChannel.unsubscribe();
      };
    },
    [name]
  );

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

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gridTemplateRows: '6rem 1fr 2rem 100px',
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      <div style={{ gridRow: 'span 4' }}>hello</div>
      <RoomStatus users={users} />
      <Chat bottomRef={bottomRef} messages={chat} users={users} />
      <ChatStatus users={users} />
      <Input
        pushMessage={body => RoomChannel.pushMessage(body)}
        pushIsTyping={isTyping => RoomChannel.pushIsTyping(isTyping)}
      />
    </div>
  );
};

export default Room;
