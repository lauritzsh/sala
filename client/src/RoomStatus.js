import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { connect } from 'react-redux';

import Avatar from './Avatar';

const Fade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const RoomStatus = ({ users }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <PoseGroup>
        {users.map(({ id, symbol }) => (
          <Fade key={id}>
            <Avatar style={{ marginRight: '0.5rem' }} big symbol={symbol} />
          </Fade>
        ))}
      </PoseGroup>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(RoomStatus);
