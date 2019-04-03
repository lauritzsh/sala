import { Socket } from 'phoenix';

const socketUrl =
  process.env.NODE_ENV === 'production'
    ? 'wss://sala.lauritz.me/socket'
    : 'wss://86a77cd5.ngrok.io/socket'; // 'ws://localhost:4000/socket';

const socket = new Socket(socketUrl, {});
socket.connect();

export default socket;
