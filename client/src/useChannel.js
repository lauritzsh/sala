import { useEffect, useReducer, useRef } from 'react';
import produce from 'immer';

import socket from './socket';

// from https://git.io/fhLX9
function createAction(type) {
  const action = payload => ({ type, payload });

  action.toString = () => `${type}`;
  action.type = type;

  return action;
}

function createAsyncAction(actionType) {
  const action = createAction(actionType);

  action.success = createAction(actionType + '_SUCCESS');
  action.failure = createAction(actionType + '_FAILURE');

  return action;
}

// from https://git.io/fhLPx
function createReducer(initialState, actionsMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const caseReducer = actionsMap[action.type];

      if (caseReducer) {
        return caseReducer(draft, action);
      }

      return draft;
    });
  };
}

// These are all the possible server events
// They will be automatically subscribed to
// Any new event should be added to reducer
export const events = {
  addMessage: createAction('CHAT_ADD_MESSAGE'),
  userTyping: createAction('CHAT_USER_TYPING'),
  userJoin: createAction('CHAT_USER_JOIN'),
  userLeave: createAction('CHAT_USER_LEAVE'),
  newVideo: createAction('PLAYER_NEW_VIDEO'),
  play: createAction('PLAYER_PLAY'),
  pause: createAction('PLAYER_PAUSE'),
  seek: createAction('PLAYER_SEEK'),
};

const actions = {
  ...events,
  connectRoom: createAsyncAction('CONNECT_ROOM'),
};

const initialState = {
  isConnected: false,
  error: null,
  chat: null,
  player: null,
  typing: {},
};

const reducer = createReducer(initialState, {
  [actions.connectRoom.success]: (state, { payload: { chat, player } }) => {
    state.isConnected = true;
    state.chat = chat;
    state.player = player;
  },
  [actions.connectRoom.failure]: (state, { payload }) => {
    state.isConnected = false;
    state.error = payload;
  },
  [actions.userJoin]: (state, { payload }) => {
    state.chat.users.push(payload);
  },
  [actions.userLeave]: (state, { payload }) => {
    state.chat.users = state.chat.users.filter(u => u.id !== payload.userId);
  },
  [actions.userTyping]: (state, { payload: { userId, isTyping } }) => {
    state.typing[userId] = isTyping;
  },
  [actions.newVideo]: (state, { payload: { url } }) => {
    state.player.url = url;
  },
  [actions.addMessage]: (state, { payload }) => {
    state.chat.messages.push(payload);
  },
  [actions.play]: state => {
    state.player['playing?'] = true;
  },
  [actions.pause]: state => {
    state.player['playing?'] = false;
  },
  [actions.seek]: (state, { payload: { timestamp } }) => {
    state.player.current_time = timestamp;
  },
});

const selectors = state => ({
  getIsConnected: () => state.isConnected,
  getMessages: () => state.chat.messages,
  getUsers: () => state.chat.users,
  getUrl: () => state.player.url,
  getIsPlaying: () => state.player['playing?'],
  getTimestamp: () => state.player.current_time,
  getTypingUsers: () => {
    const {
      chat: { users },
      typing,
    } = state;

    return users
      .map(u => ({ ...u, isTyping: typing[u.id] }))
      .filter(u => u.isTyping);
  },
});

export default function useChannel(name) {
  const pushRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () => {
      const channel = socket.channel('room:' + name, {});
      channel
        .join()
        .receive('ok', payload => {
          window.state = payload;
          dispatch(actions.connectRoom.success(payload));

          Object.entries(events).forEach(([key, { type }]) => {
            channel.on(type, payload => {
              dispatch({ type, payload });
            });
          });
        })
        .receive('error', error => {
          dispatch(actions.connectRoom.failure(error));
        });

      const push = Object.entries(events).reduce((acc, [key, event]) => {
        acc[key] = payload => channel.push(event.type, payload);
        return acc;
      }, {});

      pushRef.current = push;

      return () => {
        channel.leave();
      };
    },
    [name],
  );

  return [pushRef.current, selectors(state)];
}
