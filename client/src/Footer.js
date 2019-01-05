import React from 'react';
import { Link as InternalLink } from '@reach/router';
import styled from 'styled-components/macro';

import github from './icons/github.svg';

const Icon = styled.img`
  display: block;
  width: 2rem;
  height: 2rem;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 -1rem;
`;

const ListItem = styled.li`
  margin: 0 1rem;
  list-style-type: none;
  ${props => props.right && 'margin-left: auto;'}
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

export default () => (
  <div
    css={`
      margin: 2rem 0;
    `}
  >
    <List>
      <ListItem>
        <Link as={InternalLink} to="/">
          Home
        </Link>
      </ListItem>
      <ListItem>
        <Link as={InternalLink} to="/privacy">
          Privacy
        </Link>
      </ListItem>
      <ListItem right>
        <Link href="mailto:support@sala.com">Contact</Link>
      </ListItem>
      <ListItem>
        <Link href="https://github.com/lauritzsh/sala">
          <Icon src={github} />
        </Link>
      </ListItem>
    </List>
  </div>
);
