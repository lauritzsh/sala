defmodule Room.Supervisor do
  use Supervisor
  
  def start_link(name) do
    Supervisor.start_link(__MODULE__, name, name: global_name(name))
  end

  defp global_name(name) do
    {:global, { __MODULE__,  name}}
  end

  @impl true
  def init(name) do
    children = [{Room.Chat.Server, name}, {Room.Player.Server, name}]
    
    Supervisor.init(children, strategy: :one_for_one)
  end
end
