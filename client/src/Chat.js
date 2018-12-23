import React from 'react';
import { connect } from 'react-redux';

import room from './ducks/room';

import ChatMessages from './ChatMessages';
import ChatStatus from './ChatStatus';
import Input from './Input';
import RoomStatus from './RoomStatus';
import VideoInput from './VideoInput';

const Chat = () => {
  return (
    <div
      style={{
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: 'auto 6rem 1fr 2rem 6rem',
      }}
    >
      <VideoInput />
      <RoomStatus />
      <ChatMessages style={{ overflow: 'auto', paddingRight: '1rem' }} />
      <ChatStatus />
      <Input />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(room.actions.addUser(user)),
  removeUser: userId => dispatch(room.actions.removeUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
