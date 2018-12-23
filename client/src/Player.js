import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import room from './ducks/room';

const Player = ({ url, isPlaying, timestamp, onTogglePlay, onSeek, style }) => {
  const playerRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [internalTimestamp, setInternalTimestamp] = useState(timestamp);

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
      style={{ position: 'absolute' }}
      url={url}
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
        onTogglePlay(false);
      }}
    />
  );

  const controls = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{ flex: '1' }}
        onClick={() => {
          onTogglePlay(!isPlaying);
        }}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '1rem' }}>
          <button
            style={{
              width: '4rem',
            }}
            onClick={() => {
              onTogglePlay(!isPlaying);
            }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
        <div style={{ flex: '1', padding: '1rem' }}>
          <input
            style={{
              width: '100%',
            }}
            type="range"
            min="0"
            max={duration}
            value={internalTimestamp}
            onMouseUp={() => {
              onSeek(internalTimestamp);
            }}
            onChange={event => {
              const newTimestamp = parseFloat(event.target.value);
              setInternalTimestamp(newTimestamp);
            }}
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
      {isReady && controls}
    </div>
  );
};

const mapStateToProps = state => ({
  url: state.player.video_id,
  isPlaying: state.player.playing,
  timestamp: state.player.current_time,
});

const mapDispatchToProps = {
  onTogglePlay: room.actions.pushTogglePlay,
  onSeek: room.actions.pushSeek,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
