import React, { useEffect, useState } from 'react';

const Input = ({ pushMessage, pushIsTyping }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(
    () => {
      if (text) {
        if (!isTyping) {
          pushIsTyping(true);
        }

        setIsTyping(true);

        const tid = setTimeout(() => {
          pushIsTyping(false);
          setIsTyping(false);
        }, 3000);

        return () => {
          clearTimeout(tid);
        };
      }
    },
    [text]
  );

  return (
    <div style={{ padding: '1rem 1rem 1rem 0' }}>
      <textarea
        style={{
          padding: '0.5rem',
          width: '100%',
          height: '100%',
          resize: 'none',
          outline: 'none'
        }}
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={event => {
          const body = text.trim();

          if (event.key === 'Enter' && body !== '') {
            event.preventDefault();

            pushMessage(body);
            pushIsTyping(false);

            setText('');
            setIsTyping(false);
          }
        }}
      />
    </div>
  );
};

export default Input;
