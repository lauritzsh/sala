import React, { useState } from 'react';

import ReactPlayer from 'react-player';

export default ({ url, onNewVideo, style }) => {
  const [internalUrl, setInternalUrl] = useState(url);

  return (
    <div style={style}>
      <input
        type="text"
        placeholder="https://www.youtube.com/watch?v=pP44EPBMb8A"
        style={{
          width: '100%',
          fontSize: '1.5rem',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'white',
          borderBottom: '1px solid rgb(61, 72, 82)',
        }}
        value={internalUrl}
        onChange={event => {
          const newUrl = event.target.value;
          setInternalUrl(newUrl);

          if (ReactPlayer.canPlay(newUrl)) {
            onNewVideo(newUrl);
          }
        }}
      />
    </div>
  );
};
