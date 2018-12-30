import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import Avatar from './Avatar';

const Fade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default ({ users }) => {
  console.log(users);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PoseGroup flipMove={false}>
        {users.map(u => (
          <Fade key={u.id}>
            <Avatar symbol={u.symbol} medium />
          </Fade>
        ))}
        {users.length > 0 && (
          <Fade key="info" style={{ marginLeft: '0.25rem' }}>
            is typing
          </Fade>
        )}
      </PoseGroup>
    </div>
  );
};
