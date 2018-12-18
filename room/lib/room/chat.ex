defmodule Room.Chat do
  alias Room.Chat
  
  defp global_name(name), do: Chat.Server.global_name(name)

  def get(name) do
    GenServer.call(global_name(name), :get)
  end

  def count_users(name) do
    GenServer.call(global_name(name), :count_users)
  end
  
  def join(name) do
    GenServer.call(global_name(name), :join)
  end
  
  def add_message(name, user_id, body) do
    GenServer.call(global_name(name), {:add_message, user_id, body})
  end
  
  def leave(name, user_id) do
    GenServer.cast(global_name(name), {:leave, user_id})
    name
  end
end
