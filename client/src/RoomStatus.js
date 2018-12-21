import React from 'react';

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

export default RoomStatus;
