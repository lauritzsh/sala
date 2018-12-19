defmodule ColorMan.Server do
  use GenServer

  @colors [
  "#E3342F",
  "#F6993F",
  "#FFED4A",
  "#38C172",
  "#4DC0B5",
  "#3490DC",
  "#6574CD",
  "#9561E2",
  "#F66D9B",
  "#22292F"
] 

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end


  def take() do
    GenServer.call(__MODULE__, :take)
  end

  def give(color) do
    GenServer.cast(__MODULE__, {:give, color})
  end

  @impl true
  def init(_) do
    {:ok, @colors}
  end

  @impl true
  def handle_call(:take, _from, [color | colors]) do
    {:reply, color, colors}
  end

  @impl true
  def handle_cast({:give, color}, colors) do
    {:noreply, colors ++ [color]}
  end
end
