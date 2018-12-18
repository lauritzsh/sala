defmodule Room.DynamicSupervisor do
  use DynamicSupervisor

  def start_link(arg) do
    DynamicSupervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def start_child(name) do
    spec = {Room.Supervisor, name}
    DynamicSupervisor.start_child(__MODULE__, spec)
  end

  def find_or_create(name) do
    case start_child(name) do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
      error -> error
    end
  end

  @impl true
  def init(_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end
end
