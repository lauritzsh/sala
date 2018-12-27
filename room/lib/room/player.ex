defmodule Room.Player do
  @derive Jason.Encoder
  defstruct video_id: "", playing: false, current_time: 0

  def new() do
    %__MODULE__{}
  end

  def play(%__MODULE__{} = player, playing?) do
    %__MODULE__{player | playing: playing?}
  end

  def progress(%__MODULE__{} = player) do
    %__MODULE__{player | current_time: player.current_time + 1}
  end

  def seek(%__MODULE__{} = player, to) do
    %__MODULE__{player | current_time: to}
  end

  def url(%__MODULE__{} = player, url) do
    %__MODULE__{player | video_id: url}
  end
end
