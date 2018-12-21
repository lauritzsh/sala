defmodule Room.User do
  @derive Jason.Encoder
  defstruct id: nil, symbol: nil

  def new(id, symbol) do
    %__MODULE__{id: id, symbol: symbol}
  end
end
