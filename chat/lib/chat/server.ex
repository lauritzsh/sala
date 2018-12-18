defmodule Chat.Server do
  use GenServer

  alias Chat.Impl

  def start_link(name) do
    GenServer.start_link(__MODULE__, [], name: name)
  end

  def init(_) do
    {:ok, Impl.new()}
  end

  def handle_call({:add, message}, _from, messages) do
    messages = [message | messages]

    {:reply, messages, messages}
  end

  def handle_call(:messages, _from, messages) do
    {:reply, messages, messages}
  end
end
