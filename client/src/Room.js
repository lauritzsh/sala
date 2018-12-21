import React, { useEffect, useState, useReducer } from 'react';
import produce from 'immer';

import RoomChannel from './ChatService';
import Chat from './Chat';
import Player from './Player';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'JOIN_REQUEST':
      draft.isLoading = true;
      draft.error = null;
      return;

    case 'JOIN_SUCCESS':
      return { ...action.payload, isLoading: false, error: null };

    case 'JOIN_FAILURE':
      draft.isLoading = false;
      draft.error = action.payload;
      return;

    case 'LEAVE':
      return;

    default:
      return;
  }
});

const Room = ({ name }) => {
  const [url] = useState('https://youtu.be/9CAbLfHd2Xs');

  const [state, dispatch] = useReducer(reducer, { isLoading: true });

  useEffect(
    () => {
      dispatch({ type: 'JOIN_REQUEST' });

      RoomChannel.join(name, {
        onSuccess(room) {
          dispatch({ type: 'JOIN_SUCCESS', payload: room });
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

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  console.log(state);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      <Player url={url} style={{ margin: '1rem' }} />
      <Chat initialChat={state.chat} initialUsers={state.users} />
    </div>
  );
};

export default Room;
