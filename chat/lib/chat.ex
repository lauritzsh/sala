defmodule Chat do
  alias Chat.Message
  
  def new do
    []
  end

  def add_message(chat, %Message{} = message) do
    [message | chat]
  end
end
