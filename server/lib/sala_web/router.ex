defmodule SalaWeb.Router do
  use SalaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SalaWeb do
    pipe_through :api
  end
end
