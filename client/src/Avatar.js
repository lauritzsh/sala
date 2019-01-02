import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  font-size: ${props =>
    props.big ? '2rem' : props.medium ? '1rem' : '0.5rem'};
`;

export default ({ symbol, ...props }) => <Wrapper {...props}>{symbol}</Wrapper>;
