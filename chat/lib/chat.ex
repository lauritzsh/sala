defmodule Chat do
  alias Chat.Message

  def new(name) do
    {:ok, chat} = Chat.Server.start_link(name)

    chat
  end

  def new_message(body, seconds, date) do
    Message.new(body, seconds, date)
  end

  def add(chat, %Message{} = message) do
    GenServer.call(chat, {:add, message})
  end

  def messages(chat) do
    GenServer.call(chat, :messages)
  end
end
