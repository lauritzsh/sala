defmodule Room.User do
  @derive Jason.Encoder
  defstruct id: nil, color: nil

  def new(id, color) do
    %__MODULE__{id: id, color: color}
  end
end
