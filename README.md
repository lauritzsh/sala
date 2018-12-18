# Sala

Sala (2018) is an online application that provides you with a private room for
watching videos with your friends, colleagues, or anyone else. Share the link
and every action is synchronized automatically with everyone.

No need to tell anyone to pause the video -- just pause!

## How to run

You will need to have Elixir and Node installed. One option is using
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

## Motivation

The purpose of Sala was threefold:

- To learn about React functional components, which at the time back in 2018,
was still only available in an alpha release of React.
- To learn about Elixir's (BEAM's) "let it crash" philosophy.
- To get a better understanding of hosting a project and the CI/CD process.

It ended up being a valuable learning experience, especially learning how Elixir
works with its supervisor trees, leaving a good impression. I ended up using the
project at a job interview to express my thought process and skills, where I got
an offer and accepted it.