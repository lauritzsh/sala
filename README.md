# Sala

Running in production at [sala.lauritz.me](https://sala.lauritz.me/).

[![CircleCI](https://circleci.com/gh/lauritzsh/sala.svg?style=svg&circle-token=2a4f7eae79ce58ddc5765667b2b18bbf9b30bec6)](https://circleci.com/gh/lauritzsh/sala)

Sala is a free online application that provides you with a private room for
watching videos with your friends, colleagues, or anyone else. Share the link
and every action is synchronized automatically with everyone.

No need to tell anyone to pause the video – just pause!

## How to run

You will need to have Elixir and Node installed. It is recommended to use
[asdf](https://github.com/asdf-vm/asdf).

You will first run the server:

- `cd server`
- `mix deps.get`
- `iex -S mix phx.server`

In another terminal, you will start the client:

- `cd client`
- `yarn`
- `yarn start`

For further instructions, please see the README in both directories.
