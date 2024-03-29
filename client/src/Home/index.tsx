import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps, navigate } from '@reach/router';
import posed from 'react-pose';

import previewImage from './preview.png';
import playImage from './play.png';

import {
  Box,
  Button as BaseButton,
  Container,
  Footer,
  Header,
  Section,
} from '../shared';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  line-height: 1;
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Button = posed(BaseButton)({
  hoverable: true,
  init: { scale: 1, backgroundColor: 'hsla(214, 69%, 39%, 1)' },
  hover: { scale: 1.1, backgroundColor: 'hsla(214, 69%, 44%, 1)' },
});

type ActionButtonProps = {
  children: React.ReactNode;
};

const ActionButton = ({ children }: ActionButtonProps) => (
  <Button
    onClick={() => {
      const randomId = Math.random()
        .toString(36)
        .substring(2);

      navigate(`s/${randomId}`);
    }}
  >
    {children}
  </Button>
);

const Image = styled.img<{ css?: string }>`
  display: block;
  max-width: 100%;
`;

const Left = Box;
const Right = Box;

const Hero = () => (
  <Section
    css={`
      background: #2f80ed;
      color: #f8fafc;
    `}
  >
    <Container css="margin-bottom: 4rem;">
      <Header />
    </Container>
    <Container
      css={`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4rem;
      `}
    >
      <Left>
        <HeroTitle>Enjoy videos with anyone – anywhere</HeroTitle>
        <p>
          Sala is a free online application that provides you with a private
          room for watching videos with your friends, colleagues, or anyone
          else. Share the link and every action is synchronized automatically
          with everyone.
        </p>
        <p>No need to tell anyone to pause the video – just pause!</p>
        <ActionButton>Get your room</ActionButton>
      </Left>
      <Right>
        <Image src={playImage} alt="Sala" />
      </Right>
    </Container>
  </Section>
);

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

type FeatureProps = {
  title: string;
  children: React.ReactNode;
};

const Feature = ({ title, children }: FeatureProps) => (
  <Box css="margin-bottom: 2rem;">
    <FeatureTitle>{title}</FeatureTitle>
    {children}
  </Box>
);

type FeatureSectionProps = {
  css?: string;
  className?: string;
};

const FeatureSection = ({ className }: FeatureSectionProps) => (
  <Section className={className} css="background: white; color: #3D4852;">
    <Container>
      <SectionTitle>
        Why Sala?{' '}
        <span role="img" aria-label="Thinking">
          🤔
        </span>
      </SectionTitle>
    </Container>
    <Container
      css={`
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 4rem;
      `}
    >
      <Left>
        <Feature title="Ad-free experience">
          No one likes ads and you will probably block them anyway. Enjoy an
          ad-free experience anyway with Sala.
        </Feature>
        <Feature title="Name your room">
          Rooms don't have to be a random, gibberish name. Just enter any name
          you want in the URL and your room will be created.
        </Feature>
        <Feature title="No bloat">
          <p>
            Only the most necessary features: A big player and a small chat for
            you and your friends.
          </p>

          <p>
            Missing a feature?{' '}
            <a href="mailto:support@sala.com">Request here</a>.
          </p>
        </Feature>
      </Left>
      <Right>
        <Image
          src={previewImage}
          alt="Preview image of room"
          css="box-shadow: 0 5px 10px rgba(0,0,0,0.5);"
        />
      </Right>
    </Container>
  </Section>
);

export default (props: RouteComponentProps) => {
  document.title = 'Sala';

  return (
    <Wrapper>
      <Hero />
      <FeatureSection css="flex: 1;" />
      <Footer />
    </Wrapper>
  );
};
