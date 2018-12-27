defmodule Room.Avatar.Server do
  use GenServer

  @symbols ~w(🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵)

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def take() do
    GenServer.call(__MODULE__, :take)
  end

  def give(symbol) do
    GenServer.cast(__MODULE__, {:give, symbol})
  end

  @impl true
  def init(_) do
    {:ok, @symbols}
  end

  @impl true
  def handle_call(:take, _from, [symbol | symbols]) do
    {:reply, symbol, symbols}
  end

  @impl true
  def handle_cast({:give, symbol}, symbols) do
    {:noreply, symbols ++ [symbol]}
  end
end
