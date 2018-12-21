import React, { useState } from 'react';

import RoomChannel from './ChatService';

const VideoInput = () => {
  const [url, setUrl] = useState('');

  return (
    <div style={{ marginTop: '1rem', marginRight: '1rem' }}>
      <input
        placeholder="https://www.youtube.com/watch?v=pP44EPBMb8A"
        style={{
          width: '100%',
          fontSize: '1.5rem',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'white',
          borderBottom: '1px solid rgb(61, 72, 82)'
        }}
        value={url}
        onChange={event => {
          const newUrl = event.target.value;

          setUrl(newUrl);
          RoomChannel.pushNewVideo(newUrl);
        }}
      />
    </div>
  );
};

export default VideoInput;
