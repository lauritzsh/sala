import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import InputRange from 'react-input-range';

const PlayButton = () => (
  <svg viewBox="0 0 20 20">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="icon-shape">
        <polygon
          id="Rectangle-161"
          points="4 4 16 10 4 16"
          style={{ fill: 'white' }}
        />
      </g>
    </g>
  </svg>
);

const PauseButton = () => (
  <svg viewBox="0 0 20 20" width="2rem">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="icon-shape">
        <path
          d="M5,4 L8,4 L8,16 L5,16 L5,4 Z M12,4 L15,4 L15,16 L12,16 L12,4 Z"
          id="Combined-Shape"
          style={{ fill: 'white' }}
        />
      </g>
    </g>
  </svg>
);

export default ({
  url,
  isPlaying,
  timestamp,
  onPlay,
  onPause,
  onSeek,
  style,
}) => {
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
      style={{ position: 'absolute' }}
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
      className="controls"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 100%)',
      }}
    >
      <div
        style={{ flex: '1' }}
        onClick={() => {
          isPlaying ? onPause() : onPlay();
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>
        <div
          style={{ width: '2rem', cursor: 'pointer' }}
          onClick={() => {
            isPlaying ? onPause() : onPlay();
          }}
        >
          {isPlaying ? <PauseButton /> : <PlayButton />}
        </div>
        <div style={{ flex: '1', margin: '0 2rem' }}>
          <InputRange
            minValue={0}
            maxValue={duration}
            value={internalTimestamp}
            formatLabel={value => ''}
            onChangeComplete={onSeek}
            onChange={setInternalTimestamp}
          />
        </div>
        <div style={{ width: '8rem', marginRight: '1rem' }}>
          <InputRange
            minValue={0}
            maxValue={1}
            step={0.01}
            value={volume}
            formatLabel={value => ''}
            onChange={setVolume}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        ...style,
        background: 'black',
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
      }}
    >
      {player}
      {controls}
    </div>
  );
};
