import React from 'react';
import { connect } from 'react-redux';

import Avatar from './Avatar';

const RoomStatus = ({ users }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {users.map(({ id, symbol }) => (
        <Avatar
          key={id}
          style={{ marginRight: '0.5rem' }}
          big
          symbol={symbol}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(RoomStatus);
