import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Avatar from './Avatar';

const userToSymbol = (userId, users) => {
  const user = users.find(u => u.id === userId);

  if (user) {
    return user.symbol;
  }

  return '';
};

const Message = ({ body, symbol, userId }) => (
  <div style={{ display: 'flex', marginBottom: '1rem' }}>
    <div
      title={userId}
      style={{
        display: 'flex',
        width: '1rem',
        alignItems: 'center'
      }}
    >
      {symbol ? <Avatar symbol={symbol} /> : <Avatar left />}
    </div>
    <div style={{ flex: '1' }}>{body}</div>
  </div>
);

const ChatMessages = ({ users, messages, style }) => {
  if (!messages) {
    return <div />;
  }

  const Messages = () =>
    messages.map(({ user_id, body }, i) => {
      const symbol = userToSymbol(user_id, users);

      return <Message key={i} body={body} symbol={symbol} userId={user_id} />;
    });

  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(
    () => {
      if (isAtBottom) {
        bottomRef.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    },
    [messages, isAtBottom]
  );

  return (
    <div
      style={style}
      onScroll={event => {
        const { target } = event;
        const { scrollHeight, scrollTop, clientHeight } = target;
        setIsAtBottom(scrollHeight - scrollTop === clientHeight);
      }}
    >
      <Messages />
      <div ref={bottomRef} />
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  messages: state.chat
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessages);
