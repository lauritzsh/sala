defmodule Room.Player.Impl do
  def new() do
    %{playing?: false, url: "", current_time: 0}
  end

  def play(player) do
    %{player | playing?: true}
  end

  def pause(player) do
    %{player | playing?: false}
  end

  def progress(%{playing?: true} = player) do
    Map.update!(player, :current_time, &(&1 + 1))
  end

  def progress(player) do
    player
  end

  def new_video(player, url) do
    %{player | url: url}
  end

  def seek(player, timestamp) do
    %{player | current_time: timestamp}
  end
end
