import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  outline: none;
  color: white;
  border: none;
  border-bottom: 1px solid #3d4852;
  background: none;
  font-size: 1rem;
  padding-bottom: 0.25rem;

  ::placeholder {
    color: #8795a1;
  }
`;

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
    <Input
      placeholder="Message"
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
  );
};
