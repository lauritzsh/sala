defmodule Room.Cache do
  use DynamicSupervisor

  def start_link(_arg) do
    DynamicSupervisor.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def find_room(room_name) do
    find_or_create_room(room_name)
  end

  defp find_or_create_room(room_name) do
    case DynamicSupervisor.start_child(__MODULE__, {Room.Server, room_name}) do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
  end

  @impl true
  def init(_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end
end
