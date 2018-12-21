defmodule Room.Server do
  require Logger

  use GenServer, restart: :transient

  @expires_in 10 * 60 * 1000

  def start_link(name) do
    GenServer.start_link(__MODULE__, name, name: global_name(name))
  end

  def where_is(name) do
    case :global.whereis_name({__MODULE__, name}) do
      :undefined -> nil
      pid -> pid
    end
  end

  def get(room_server) do
    GenServer.call(room_server, :get)
  end

  def add_message(room_server, user_id, body) do
    GenServer.call(room_server, {:add_message, user_id, body})
  end

  def join(room_server) do
    GenServer.call(room_server, :join)
  end

  def leave(room_server, user) do
    GenServer.call(room_server, {:leave, user})
  end

  def play(room_server) do
    GenServer.cast(room_server, :play)
  end

  defp global_name(name) do
    {:global, {__MODULE__, name}}
  end

  @impl true
  def init(name) do
    {:ok, Room.new(name), @expires_in}
  end

  @impl true
  def handle_call(:get, _from, state) do
    room = %{state | chat: state.chat |> Enum.reverse() }
    
    {:reply, room, state, @expires_in}
  end

  @impl true
  def handle_call({:add_message, user_id, body}, _from, room) do
    new_message = Chat.Message.new(user_id, body)
    new_chat = Chat.add_message(room.chat, new_message)
    new_room = %{room | chat: new_chat}
    
    {:reply, new_message, new_room, @expires_in}
  end

  @impl true
  def handle_call(:join, _from, room) do
    user_id = Randomizer.randomizer(6)
    user_symbol = ColorMan.Server.take()
    new_user = Room.User.new(user_id, user_symbol)
    new_room = Room.join(room, new_user)

    {:reply, new_user, new_room, @expires_in}
  end

  @impl true
  def handle_call({:leave, user}, _from, room) do
    new_room = Room.leave(room, user.id)
    ColorMan.Server.give(user.symbol)

    {:reply, new_room, new_room, @expires_in}
  end

  @impl true
  def handle_cast(:play, room) do
    new_player = Player.play(room.player)
    new_state = %{room | player: new_player}

    {:noreply, new_state, @expires_in}
  end

  @impl true
  def handle_info(:timeout, room) do
    Logger.info("#{room.name} was idle for #{@expires_in / 1000} seconds; shutting down.")

    {:stop, :normal, room}
  end

  @impl true
  def handle_info(unknown_message, state) do
    super(unknown_message, state)

    {:noreply, state, @expires_in}
  end
end
