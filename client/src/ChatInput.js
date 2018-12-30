import React, { useEffect, useState } from 'react';

export default ({ onAddMessage, onTyping }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(
    () => {
      if (text) {
        if (!isTyping) {
          onTyping(true);
        }

        setIsTyping(true);

        const tid = setTimeout(() => {
          onTyping(false);
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

            onAddMessage(body);
            onTyping(false);

            setText('');
            setIsTyping(false);
          }
        }}
      />
    </div>
  );
};
