import styled from 'styled-components';

type Props = {
  narrow?: boolean;
  css?: string;
};

export default styled.div<Props>`
  width: ${props => (props.narrow ? '48rem' : '64rem')};
  margin: 2rem auto;
`;
