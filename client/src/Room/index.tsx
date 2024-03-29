import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';

import useOffline from './useOffline';
import useChannel from './useChannel';

import Dialog from './Dialog';
import VideoInput from './VideoInput';
import RoomStatus from './RoomStatus';
import Chat from './Chat';
import Player from './Player';

const Wrapper = styled.div`
  padding: 1rem;
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 24rem;
  grid-template-rows: 4rem auto;
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = RouteComponentProps & {
  name?: string;
};

export default ({ name }: Props) => {
  const isOffline = useOffline();
  const [push, select] = useChannel(name) as any;

  useEffect(
    () => {
      document.title = `#${name}`;
    },
    [name],
  );

  const isConnected = select.getIsConnected();

  return (
    <Wrapper>
      <Dialog warning show={isOffline}>
        Your connection seems to be interrupted
      </Dialog>
      {isConnected && (
        <>
          <VideoInput
            url={select.getUrl()}
            onNewVideo={url => push.newVideo({ url })}
          />
          <RoomStatus users={select.getUsers()} />
          <Player
            url={select.getUrl()}
            isPlaying={select.getIsPlaying()}
            startFrom={select.getTimestamp()}
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
        </>
      )}
    </Wrapper>
  );
};
