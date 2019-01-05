import React from 'react';
import 'styled-components/macro';
import { navigate } from '@reach/router';

import Template from './Template';
import previewImage from './preview.png';

const Feature = ({ title, children }) => (
  <div>
    <h2 css="margin: 0;">{title}</h2>
    {children}
  </div>
);

export default () => (
  <Template>
    <div css="margin-top: 4rem;">
      <h1
        css={`
          font-size: 4rem;
          margin-top: 0;
          line-height: 1;
        `}
      >
        Enjoy videos with friends
      </h1>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 4rem;
        `}
      >
        <div
          css={`
            display: grid;
            grid-gap: 2rem;
          `}
        >
          <div>
            <button
              css={`
                border: 0;
                padding: 1rem;
                font-size: 1rem;
                color: #f8fafc;
                transition: background 0.25s, box-shadow 0.25s;
                box-shadow: 0;
                background: #3d4852;
                cursor: pointer;

                :hover {
                  background: #606f7b;
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
          <div
            css={`
              margin-top: 4rem;
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
              Hate sharing a video link with your friends and counting down when
              to hit play? With Sala, your actions such as play and pause are
              automatically shared, keeping all your videos synchronized.
            </Feature>
            <Feature title="No bloat">
              <p>
                Only the most necessary features: A big player and a small chat
                for you and your friends.
              </p>
              <p>
                Missing a feature?{' '}
                <a href="mailto:support@sala.com">Request here.</a>
              </p>
            </Feature>
            <Feature title="Name your room">
              Rooms don't have to be a random, gibberish name. Just enter any
              name you want in the URL and your room will be created.
            </Feature>
          </div>
        </div>
        <div css="">
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
  </Template>
);
