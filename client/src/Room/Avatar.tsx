import React from 'react';
import styled from 'styled-components';

type Props = {
  css?: string;
  symbol?: string;
  medium?: boolean;
  big?: boolean;
};

const Wrapper = styled.span<Props>`
  font-size: ${props =>
    props.big ? '2rem' : props.medium ? '1rem' : '0.5rem'};
`;

export default ({ symbol, ...props }: Props) => (
  <Wrapper {...props}>{symbol}</Wrapper>
);
