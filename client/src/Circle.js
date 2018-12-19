import React from 'react';

const Circle = ({ big, border, color, style = {} }) => (
  <div
    style={{
      ...style,
      display: 'inline-block',
      width: big ? '2rem' : '0.5rem',
      height: big ? '2rem' : '0.5rem',
      background: color,
      borderRadius: '50%',
      border: border ? `1px solid ${border}` : '',
      boxShadow: big ? '0 2px 5px rgba(0, 0, 0, .25)' : ''
    }}
  />
);

export default Circle;
