defmodule Sala.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    Room.new("react", "https://www.youtube.com/watch?v=hLljd8pfiFg")
    |> IO.inspect()

    children = [
      SalaWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Sala.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    SalaWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
