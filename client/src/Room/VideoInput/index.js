import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import replace from 'icons/replace.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  background: #3d4852;
  padding: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  outline: none;
  color: white;

  ::placeholder {
    color: #8795a1;
  }
`;

const Icon = styled.img`
  transition: opacity 0.25s linear;
  opacity: ${props => (props.isPlayable ? 1 : 0.25)};
  width: 1.5rem;
  height: 1.5rem;
  cursor: ${props => (props.isPlayable ? 'pointer' : '')};
`;

export default ({ url, onNewVideo }) => {
  const [internalUrl, setInternalUrl] = useState(url);

  const isPlayable = ReactPlayer.canPlay(internalUrl);

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        value={internalUrl}
        onChange={event => {
          const newUrl = event.target.value;
          setInternalUrl(newUrl);
        }}
      />
      <Icon
        src={replace}
        title={isPlayable ? 'Play this video now' : 'Video is not valid'}
        isPlayable={isPlayable}
        onClick={() => {
          if (isPlayable) {
            onNewVideo(internalUrl);
          }
        }}
      />
    </Wrapper>
  );
};
