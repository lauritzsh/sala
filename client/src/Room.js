import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import room from './ducks/room';

import Chat from './Chat';
import Player from './Player';

const Room = ({ name, onCreateConnection, isConnected, users, chat }) => {
  useEffect(
    () => {
      document.title = `#${name}`;

      onCreateConnection(name);
    },
    [name]
  );

  if (!isConnected) {
    return <div />;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      <Player style={{ margin: '1rem' }} />
      <Chat initialChat={chat} initialUsers={users} />
    </div>
  );
};

const mapStateToProps = state => ({
  chat: [],
  users: [],
  isConnected: state.isConnected
});

const mapDispatchToProps = dispatch => ({
  onCreateConnection: name => dispatch(room.actions.connectRoomRequest(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
