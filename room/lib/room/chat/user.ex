defmodule Room.Chat.User do
  def new(symbol, id \\ Randomizer.randomizer(6)) do
    %{id: id, symbol: symbol}
  end
end
