import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import room from './ducks/room';

const Input = ({ onMessage, onIsTyping }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(
    () => {
      if (text) {
        if (!isTyping) {
          onIsTyping(true);
        }

        setIsTyping(true);

        const tid = setTimeout(() => {
          onIsTyping(false);
          setIsTyping(false);
        }, 3000);

        return () => {
          clearTimeout(tid);
        };
      }
    },
    [text],
  );

  return (
    <div
      style={{
        margin: '1rem 1rem 1rem 0',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 5px',
      }}
    >
      <textarea
        style={{
          padding: '0.5rem',
          width: '100%',
          height: '100%',
          outline: 'none',
          border: 'none',
          resize: 'none',
          background: '#3D4852',
          color: 'white',
        }}
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={event => {
          const body = text.trim();

          if (event.key === 'Enter' && body !== '') {
            event.preventDefault();

            onMessage(body);
            onIsTyping(false);

            setText('');
            setIsTyping(false);
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onMessage: body => dispatch(room.actions.pushMessage(body)),
  onIsTyping: isTyping => dispatch(room.actions.pushIsTyping(isTyping)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
