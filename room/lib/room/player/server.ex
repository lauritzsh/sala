defmodule Room.Player.Server do
  use GenServer

  alias Room.Player.Impl

  def start_link(name) do
    GenServer.start_link(__MODULE__, name, name: global_name(name))
  end

  def global_name(name) do
    {:global, {__MODULE__, name}}
  end

  @impl true
  def init(_name) do
    :timer.send_interval(:timer.seconds(1), self(), :progress)
    
    {:ok, Impl.new()}
  end

  @impl true
  def handle_call(:get, _from, player) do
    {:reply, player, player}
  end

  @impl true
  def handle_cast(:play, player) do
    {:noreply, Impl.play(player)}
  end

  @impl true
  def handle_cast(:pause, player) do
    {:noreply, Impl.pause(player)}
  end

  @impl true
  def handle_cast({:new_video, url}, player) do
    {:noreply, Impl.new_video(player, url)}
  end

  @impl true
  def handle_cast({:seek, timestamp}, player) do
    {:noreply, Impl.seek(player, timestamp)}
  end

  @impl true
  def handle_info(:progress, player) do
    {:noreply, Impl.progress(player)}
  end
end
