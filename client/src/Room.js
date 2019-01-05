import React, { useEffect } from 'react';
import styled from 'styled-components';

import useChannel from './useChannel';

import VideoInput from './VideoInput';
import RoomStatus from './RoomStatus';
import Chat from './Chat';
import Player from './Player';

const Wrapper = styled.div`
  padding: 1rem;
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: 4rem auto;
  width: 100%;
  height: 100%;
  position: absolute;
`;

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
    <Wrapper>
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
    </Wrapper>
  );
};
