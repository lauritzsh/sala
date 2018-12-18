defmodule Player do
  @derive Jason.Encoder
  defstruct video_id: nil, playing: false, current_time: 0

  def new() do
    %__MODULE__{}
  end

  def play(%__MODULE__{} = player) do
    %__MODULE__{player | playing: true}
  end

  def pause(%__MODULE__{} = player) do
    %__MODULE__{player | playing: false}
  end

  def progress(%__MODULE__{} = player) do
    %__MODULE__{player | current_time: player.current_time + 1}
  end

  def seek(%__MODULE__{} = player, to) do
    %__MODULE__{player | current_time: to}
  end

  # If provided with an unrecognized id string,
  # the video id will not change
  def change_id(%__MODULE__{} = player, id_str) do
    video_id = extract_id(player, id_str)

    %__MODULE__{player | video_id: video_id}
  end

  defp extract_id(%__MODULE__{} = player, str) do
    regexes = [
      ~r/\?v=(\w{11})/,
      ~r/^(\w{11})$/
    ]

    case Enum.find_value(regexes, &Regex.run(&1, str)) do
      [_, video_id] -> video_id
      nil -> player.video_id
    end
  end
end
