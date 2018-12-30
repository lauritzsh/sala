defmodule Room.Player do
  alias Room.Player

  defp global_name(name), do: Player.Server.global_name(name)

  def get(name) do
    GenServer.call(global_name(name), :get)
  end

  def play(name) do
    GenServer.cast(global_name(name), :play)
    name
  end

  def pause(name) do
    GenServer.cast(global_name(name), :pause)
    name
  end

  def new_video(name, url) do
    GenServer.cast(global_name(name), {:new_video, url})
    name
  end

  def seek(name, timestamp) do
    GenServer.cast(global_name(name), {:seek, timestamp})
    name
  end
end
