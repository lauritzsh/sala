import React from 'react';
import styled from 'styled-components/macro';
import { navigate } from '@reach/router';

import Header from './Header';
import Footer from './Footer';
import previewImage from './preview.png';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 8rem;
`;

const Hero = () => (
  <div
    css={`
      background: #12283a;
    `}
  >
    <div
      css={`
        padding: 4rem 0;
        width: 72rem;
        margin: 0 auto;
      `}
    >
      <Header />
    </div>
    <div
      css={`
        padding-bottom: 4rem;
        width: 72rem;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4rem;
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <div>
          <h1
            css={`
              font-size: 4rem;
              margin-top: 0;
              line-height: 1;
            `}
          >
            Enjoy videos with friends
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <button
            css={`
              border: 0;
              padding: 1rem;
              font-size: 1rem;
              color: #f8fafc;
              transition: background 0.25s, box-shadow 0.25s;
              box-shadow: 0;
              background: #2f365f;
              cursor: pointer;

              :hover {
                background: #5661b3;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
              }
            `}
            onClick={() => {
              const randomId = Math.random()
                .toString(36)
                .substring(2);

              navigate(`s/${randomId}`);
            }}
          >
            Create new room
          </button>
        </div>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <img
          css={`
            display: block;
            max-width: 100%;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.75);
          `}
          alt="Screenshot of a room"
          src={previewImage}
        />
      </div>
    </div>
  </div>
);

const Feature = ({ title, children }) => (
  <div>
    <h2 css="margin: 0;">{title}</h2>
    {children}
  </div>
);

const FeatureSection = () => (
  <Section>
    <div
      css={`
        width: 72rem;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
      `}
    >
      <Feature title="Ad-free experience">
        No one likes ads and you will probably block them anyway. Enjoy an
        ad-free experience anyway with Sala.
      </Feature>
      <Feature title="Synchronized video">
        Hate sharing a video link with your friends and counting down when to
        hit play? With Sala, your actions such as play and pause are
        automatically shared, keeping all your videos synchronized.
      </Feature>
      <Feature title="No bloat">
        <p>
          Only the most necessary features: A big player and a small chat for
          you and your friends.
        </p>
        <p>
          Missing a feature? <a href="mailto:support@sala.com">Request here.</a>
        </p>
      </Feature>
      <Feature title="Name your room">
        Rooms don't have to be a random, gibberish name. Just enter any name you
        want in the URL and your room will be created.
      </Feature>
    </div>
  </Section>
);

export default () => (
  <>
    <Hero />
    <FeatureSection />
    <Section css="background: black; color: white; padding: 2rem 0;">
      <div css="width: 72rem; margin: 0 auto;">
        <Footer />
      </div>
    </Section>
  </>
);
