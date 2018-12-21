import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';

import RoomChannel from './ChatService';

const Player = ({ style }) => {
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [url, setUrl] = useState(null);

  function handleIsPlaying({ isPlaying }) {
    setIsPlaying(isPlaying);
  }

  function handleSeek({ timestamp: newTimestamp }) {
    setTimestamp(newTimestamp);
    playerRef.current.seekTo(newTimestamp);
  }

  useEffect(() => {
    RoomChannel.onPlay(handleIsPlaying)
      .onSeek(handleSeek)
      .onNewVideo(function handleNewVideo(video) {
        console.log('Got new video', video);
        setUrl(video.url);
      });
  });

  return (
    <div
      style={{
        ...style,
        background: 'black',
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px'
      }}
    >
      <ReactPlayer
        ref={playerRef}
        style={{ position: 'absolute' }}
        url={url}
        playing={isPlaying}
        width={'100%'}
        height={'100%'}
        onProgress={progress => {
          setTimestamp(progress.played);
        }}
        onEnded={() => {
          setIsPlaying(false);
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '1rem'
        }}
      >
        <div style={{ flex: '1' }} />
        <div>
          <button onClick={() => RoomChannel.pushIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={timestamp}
            onMouseUp={() => {
              RoomChannel.pushSeek(timestamp);
            }}
            onChange={event => {
              setTimestamp(parseFloat(event.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
