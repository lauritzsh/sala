import styled from 'styled-components';

export default styled.div`
  width: ${props => (props.narrow ? '48rem' : '64rem')};
  margin: 2rem auto;
`;
