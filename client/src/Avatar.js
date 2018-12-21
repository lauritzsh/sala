import React from 'react';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';

const Avatar = ({ left, symbol, style, big }) => (
  <div style={{ ...style, fontSize: big ? '2rem' : '0.5rem' }}>
    {left ? ' ' : symbol}
  </div>
);

export default Avatar;
