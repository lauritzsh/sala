import React from 'react';
import { Link as InternalLink } from '@reach/router';
import styled from 'styled-components/macro';

import github from 'icons/github.svg';
import Container from './Container';
import Section from './Section';

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
  <Section css="background: #0E0E0E;">
    <Container>
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
          <Link href="https://github.com/salachat/sala">
            <Icon src={github} />
          </Link>
        </ListItem>
      </List>
    </Container>
  </Section>
);
