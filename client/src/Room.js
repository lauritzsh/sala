import React, { useEffect } from 'react';

import useChannel from './useChannel';

import VideoInput from './VideoInput';
import RoomStatus from './RoomStatus';
import Chat from './Chat';
import Player from './Player';

export default ({ name }) => {
  const [push, select] = useChannel(name);

  useEffect(
    () => {
      document.title = `#${name}`;
    },
    [name],
  );

  if (!select.getIsConnected()) {
    return <div />;
  }

  return (
    <div
      style={{
        padding: '1rem',
        gridGap: '1rem',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gridTemplateRows: 'auto 1fr',
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      <VideoInput
        url={select.getUrl()}
        onNewVideo={url => push.newVideo({ url })}
      />
      <RoomStatus users={select.getUsers()} />
      <Player
        url={select.getUrl()}
        isPlaying={select.getIsPlaying()}
        timestamp={select.getTimestamp()}
        onPlay={push.play}
        onPause={push.pause}
        onSeek={timestamp => push.seek({ timestamp })}
      />
      <Chat
        messages={select.getMessages()}
        users={select.getUsers()}
        typingUsers={select.getTypingUsers()}
        onAddMessage={body => push.addMessage({ body })}
        onTyping={isTyping => push.userTyping({ isTyping })}
      />
    </div>
  );
};
