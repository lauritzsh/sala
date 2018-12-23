import { createAction, createReducer, createSelector } from 'redux-starter-kit';

const actions = {
  connectRoomRequest: createAction('CONNECT_ROOM_REQUEST'),
  connectRoomSuccess: createAction('CONNECT_ROOM_SUCCESS'),
  connectRoomFailure: createAction('CONNECT_ROOM_FAILURE'),
  pushMessage: body => (dispatch, getState, { push }) => {
    push(actions.channel.newMessage.type, { body });
  },
  pushIsTyping: isTyping => (dispatch, getState, { push }) => {
    push(actions.channel.userTyping.type, { isTyping });
  },
  pushNewVideo: url => (dispatch, getState, { push }) => {
    push(actions.channel.newVideo.type, { url });
  },
  pushTogglePlay: isPlaying => (dispatch, getState, { push }) => {
    push(actions.channel.videoPlaying.type, { isPlaying });
  },
  pushSeek: timestamp => (dispatch, getState, { push }) => {
    push(actions.channel.videoSeek.type, { timestamp });
  },
};

Object.keys(actions).forEach(key => {
  const action = actions[key];
  action.type = action.toString();
});

actions.channel = {
  newMessage: createAction('NEW_MESSAGE'),
  userTyping: createAction('USER_TYPING'),
  userJoin: createAction('USER_JOIN'),
  userLeave: createAction('USER_LEAVE'),
  newVideo: createAction('NEW_VIDEO'),
  videoPlaying: createAction('VIDEO_PLAYING'),
  videoSeek: createAction('VIDEO_SEEK'),
};

Object.keys(actions.channel).forEach(key => {
  const action = actions.channel[key];
  action.type = action.toString();
});

const initialState = {
  error: null,
  isConnected: false,
  chat: [],
  player: {},
  users: [],
  usersTyping: {},
};

const reducer = createReducer(initialState, {
  [actions.connectRoomRequest]: state => {
    state.isConnected = false;
  },
  [actions.connectRoomSuccess]: (state, { payload }) => {
    window.room = payload;
    return { ...state, ...payload, isConnected: true };
  },
  [actions.connectRoomFailure]: (state, { payload }) => {
    state.isConnected = false;
    state.error = payload;
  },
  [actions.channel.newMessage]: (state, { payload }) => {
    state.chat.push(payload);
  },
  [actions.channel.userJoin]: (state, { payload }) => {
    state.users.push(payload);
  },
  [actions.channel.userLeave]: (state, { payload: { userId } }) => {
    state.users = state.users.filter(u => u.id !== userId);
  },
  [actions.channel.userTyping]: (state, { payload: { userId, isTyping } }) => {
    state.usersTyping[userId] = isTyping;
  },
  [actions.channel.newVideo]: (state, { payload: { url } }) => {
    state.player.video_id = url;
  },
  [actions.channel.videoPlaying]: (state, { payload: { isPlaying } }) => {
    state.player.playing = isPlaying;
  },
  [actions.channel.videoSeek]: (state, { payload: { timestamp } }) => {
    state.player.current_time = timestamp;
  },
});

const selectors = {
  usersTyping: createSelector(
    ['users', 'usersTyping'],
    (users, usersTyping) =>
      users.map(u => ({ ...u, isTyping: usersTyping[u.id] })),
  ),
};

export default { reducer, actions, selectors };
