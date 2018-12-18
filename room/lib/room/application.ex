defmodule Room.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      {Registry, keys: :unique, name: Room.ChatRegistry},
      # {Registry, keys: :unique, name: Room.PlayerRegistry}
    ]

    opts = [strategy: :one_for_one, name: Room.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
