defmodule Room.Chat do
  alias Room.Chat.Message

  def new do
    []
  end

  def add_message(chat, %Message{} = message) do
    [message | chat]
  end
end
