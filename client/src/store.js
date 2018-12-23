import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import socket from './socket';
import room from './ducks/room';

import Channel from './Channel';

const socketMiddleware = channel => store => next => {
  return action => {
    if (action.type === room.actions.connectRoomRequest.type) {
      const roomName = action.payload;

      channel.join(roomName, {
        onSuccess(payload) {
          store.dispatch(room.actions.connectRoomSuccess(payload));

          Object.keys(room.actions.channel).forEach(key => {
            const action = room.actions.channel[key];

            channel.subscribe(action.type, payload => {
              store.dispatch({ type: action.type, payload });
            });
          });
        }
      });
    }

    return next(action);
  };
};

const [thunk] = getDefaultMiddleware();

const channel = new Channel(socket);

const middleware = [
  thunk.withExtraArgument({ push: channel.push.bind(channel) }),
  socketMiddleware(channel)
];

export default configureStore({ reducer: room.reducer, middleware });
