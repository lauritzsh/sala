import React from 'react';
import { connect } from 'react-redux';

import room from './ducks/room';

const VideoInput = ({ url, onNewVideo, style }) => (
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
      value={url}
      onChange={event => {
        const newUrl = event.target.value.trim();

        if (newUrl !== '') {
          onNewVideo(newUrl);
        }
      }}
    />
  </div>
);

const mapStateToProps = state => ({
  url: state.player.video_id,
});

const mapDispatchToProps = {
  onNewVideo: room.actions.pushNewVideo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoInput);
