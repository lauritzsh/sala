defmodule ColorMan.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      ColorMan.Server
    ]

    opts = [strategy: :one_for_one, name: ColorMan.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
