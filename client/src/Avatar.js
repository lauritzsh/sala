import React from 'react';

const Avatar = ({ left, symbol, style, big, medium }) => (
  <span
    style={{ ...style, fontSize: big ? '2rem' : medium ? '1rem' : '0.5rem' }}
  >
    {left ? '' : symbol}
  </span>
);

export default Avatar;
