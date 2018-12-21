import { Socket } from 'phoenix';

const socketUrl = process.env.NODE_ENV === 'production'
  ? 'ws://sala.lauritz.me/socket'
  : 'ws://localhost:4000/socket'

const socket = new Socket(socketUrl, {});
socket.connect();

export default socket;
