import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import InputRange from 'react-input-range';
import styled from 'styled-components/macro';

import play from './icons/play.svg';
import pause from './icons/pause.svg';

const Icon = styled.img`
  color: white;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const Wrapper = styled.div`
  background: black;
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
`;

export default ({ url, isPlaying, timestamp, onPlay, onPause, onSeek }) => {
  const playerRef = useRef(null);

  const [duration, setDuration] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [internalTimestamp, setInternalTimestamp] = useState(timestamp);
  const [volume, setVolume] = useState(1);

  useEffect(
    () => {
      setInternalTimestamp(timestamp);
      playerRef.current.seekTo(timestamp);
    },
    [timestamp],
  );

  const player = (
    <ReactPlayer
      ref={playerRef}
      config={{
        youtube: {
          playerVars: { start: timestamp },
        },
      }}
      css={`
        position: absolute;
      `}
      url={url}
      volume={volume}
      playing={isPlaying}
      width={'100%'}
      height={'100%'}
      onReady={player => {
        setDuration(player.getDuration());
        setIsReady(true);
      }}
      onProgress={progress => {
        setInternalTimestamp(progress.playedSeconds);
      }}
      onEnded={() => {
        onPause();
      }}
    />
  );

  const controls = isReady && (
    <div
      css={`
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.1) 100%
        );
        transition: opacity 0.25s linear;
        opacity: 0;

        :hover {
          opacity: 1;
        }
      `}
    >
      <div
        css={`
          flex: 1;
        `}
        onClick={() => {
          isPlaying ? onPause() : onPlay();
        }}
      />
      <div
        css={`
          display: flex;
          align-items: center;
          margin: 1rem;
        `}
      >
        <div
          css={`
            width: 2rem;
            cursor: pointer;
          `}
          onClick={() => {
            isPlaying ? onPause() : onPlay();
          }}
        >
          {isPlaying ? <Icon src={pause} /> : <Icon src={play} />}
        </div>
        <div
          css={`
            flex: 1;
            margin: 0 2rem;
          `}
        >
          <InputRange
            minValue={0}
            maxValue={duration}
            value={internalTimestamp}
            formatLabel={() => ''}
            onChangeComplete={onSeek}
            onChange={setInternalTimestamp}
          />
        </div>
        <div
          css={`
            width: 8rem;
            margin-right: 1rem;
          `}
        >
          <InputRange
            minValue={0}
            maxValue={1}
            step={0.01}
            value={volume}
            formatLabel={() => ''}
            onChange={setVolume}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Wrapper>
      {player}
      {controls}
    </Wrapper>
  );
};
