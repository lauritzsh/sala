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
                background: #3d4852;
                cursor: pointer;

                :hover {
                  background: #606f7b;
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
              The worst is sharing a link with friends and telling them exactly
              when to press play. With Sala, when you play and pause, the action
              will be automatically synchronized to all your friends as well.
            </Feature>
            <Feature title="Supports many platforms">
              See videos from many platforms such as YouTube, Facebook, Twitch,
              Vimeo and more.
            </Feature>
            <Feature title="Name your room">
              Rooms are not limited to just random, gibberish names. Name them
              anything you want so your friends can easily join.
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
            src={previewImage}
          />
        </div>
      </div>
    </div>
  </Template>
);
