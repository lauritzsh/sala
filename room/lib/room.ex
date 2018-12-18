defmodule Room do
  @derive Jason.Encoder
  defstruct name: nil, current: 0, chat: Chat.new(), player: Player.new()

  def new(name) do
    %__MODULE__{name: name}
  end

  def join(%__MODULE__{} = room) do
    %__MODULE__{room | current: room.current + 1}
  end

  def leave(%__MODULE__{} = room) do
    %__MODULE__{room | current: room.current - 1}
  end
end
