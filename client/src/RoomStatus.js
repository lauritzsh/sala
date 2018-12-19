import React from 'react';

import Circle from './Circle';

const RoomStatus = ({ users }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {users.map(({ id, color }) => (
        <Circle key={id} style={{ marginRight: '0.5rem' }} color={color} big />
      ))}
    </div>
  );
};

export default RoomStatus;
