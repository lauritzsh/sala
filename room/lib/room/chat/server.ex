defmodule Room.Chat.Server do
  use GenServer

  alias Room.Chat.Impl

  def start_link(name) do
    GenServer.start_link(__MODULE__, name, name: global_name(name))
  end

  def global_name(name) do
    {:global, { __MODULE__,  name}}
  end

  @impl true
  def init(_name) do
    {:ok, Impl.new()}
  end

  @impl true
  def handle_call(:get, _from, chat) do
    {:reply, chat, chat}
  end

  @impl true
  def handle_call(:join, _from, chat) do
    {user, chat} = Impl.join(chat)
    {:reply, user, chat}
  end

  @impl true
  def handle_call(:count_users, _from, chat) do
    {:reply, Impl.count_users(chat), chat}
  end

  @impl true
  def handle_call({:add_message, user_id, body}, _from, chat) do
    {message, chat} = Impl.add_message(chat, user_id, body)
    {:reply, message, chat}
  end

  @impl true
  def handle_cast({:leave, user_id}, chat) do
    {:noreply, Impl.leave(chat, user_id)}
  end
end
