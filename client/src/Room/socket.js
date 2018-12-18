import { Socket } from 'phoenix';

const socketUrl =
  process.env.NODE_ENV === 'production'
    ? 'wss://melodic-elliptical-starling.gigalixirapp.com/socket'
    : 'ws://localhost:4000/socket';

const socket = new Socket(socketUrl, {});
socket.connect();

export default socket;
