import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import InputRange from 'react-input-range';
import styled from 'styled-components/macro';

import { Box } from '../../shared';
import play from 'icons/play.svg';
import pause from 'icons/pause.svg';

const Icon = styled.img`
  color: white;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

type Timestamp = number;

const getId = (input: string) => {
  const match = input.match(/v=(\w+)/);

  if (match) {
    return match[1];
  }

  if (input.length === 10) {
    return input;
  }

  return ''; // invalid
};

type Props = {
  url: string;
  isPlaying: boolean;
  startFrom: Timestamp;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (timestamp: Timestamp) => void;
};

const Player = ({
  url,
  isPlaying,
  startFrom,
  onPlay,
  onPause,
  onSeek,
}: Props) => {
  const id = getId(url);

  const [currentTime, setCurrentTime] = useState(startFrom);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(
    () => {
      const { current: player } = playerRef;
      if (player) {
        player.setVolume(volume);
      }
    },
    [volume],
  );

  useEffect(
    () => {
      const { current: player } = playerRef;
      if (player) {
        player.seekTo(startFrom);
        setCurrentTime(startFrom);
      }
    },
    [isReady, startFrom],
  );

  useEffect(
    () => {
      const intervalFn = () => {
        const { current: player } = playerRef;
        if (player) {
          isPlaying ? player.playVideo() : player.pauseVideo();
        }
      };

      intervalFn();

      const interval = setInterval(intervalFn, 1000);

      return () => {
        clearInterval(interval);
      };
    },
    [isReady, isPlaying],
  );

  useEffect(
    () => {
      const interval = setInterval(() => {
        if (isPlaying) {
          setCurrentTime(time => time + 1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    },
    [isPlaying],
  );

  const player = (
    <Box
      css={`
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        overflow: hidden;
      `}
    >
      <YouTube
        opts={{
          width: '100%',
          height: '100%',
          playerVars: { controls: 0 },
        }}
        videoId={id}
        onEnd={() => onPause()}
        onReady={({ target: player }) => {
          (window as any).player = player;
          playerRef.current = player;
          setVideoDuration(player.getDuration());
          setIsReady(true);
        }}
      />
    </Box>
  );

  const controls = isReady && (
    <Box
      css={`
        position: absolute;
        width: 100%;
        bottom: 0;
      `}
    >
      <Box
        css={`
          display: flex;
          align-items: center;
          margin: 1rem;
        `}
      >
        <Box css="width: 2rem;">
          {isPlaying ? (
            <Icon src={pause} onClick={() => onPause()} />
          ) : (
            <Icon src={play} onClick={() => onPlay()} />
          )}
        </Box>
        <Box css="flex: 1; margin: 0 2rem;">
          <InputRange
            minValue={0}
            maxValue={videoDuration}
            value={currentTime}
            onChange={value => onSeek(value as number)}
            formatLabel={() => ''}
          />
        </Box>
        <Box css="width: 8rem; margin-right: 1rem;">
          <InputRange
            minValue={0}
            maxValue={100}
            value={volume}
            onChange={value => setVolume(value as number)}
            formatLabel={() => ''}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      css={`
        position: relative;
      `}
    >
      {player}
      {controls}
    </Box>
  );
};

Player.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
  onSeek: () => {},
};

export default Player;
