import { useEffect, useState } from 'react';
import { Socket } from 'phoenix';

const socket = new Socket('ws://localhost:4000/socket');
socket.connect();

export default function useSocket(name, { onSuccess, onError, onMessage }) {
  const [channel, setChannel] = useState({});

  useEffect(
    () => {
      const newChannel = socket.channel(`room:${name}`, {});
      newChannel
        .join()
        .receive('ok', onSuccess)
        .receive('error', onError);

      setChannel(newChannel);

      return () => {
        setChannel({});
        newChannel.leave();
      };
    },
    [name]
  );

  useEffect(() => {
    console.log('Updating message handlers');
    if (channel.on) {
      channel.on('message', onMessage);
    }

    return () => {
      if (channel.off) {
        channel.off('message', onMessage);
      }
    };
  });

  return channel;
}
