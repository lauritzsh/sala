defmodule SalaWeb.RoomChannel do
  require Logger
  
  use Phoenix.Channel

  def join("room:" <> name, _message, socket) do
    room_pid = Room.Cache.find_room(name)

    user = Room.Server.join(room_pid)
    room = Room.Server.get(room_pid)

    socket = socket
      |> assign(:user, user)
      |> assign(:room_pid, room_pid)

    send(self(), :after_join)
    
    {:ok, room, socket}
  end

  def terminate(_reason, socket) do
    %{user: user, room_pid: room_pid} = socket.assigns

    Room.Server.leave(room_pid, user)
    broadcast_from!(socket, "userLeave", %{userId: user.id})
    
    :stop
  end

  def handle_in("message", %{"body" => ""}, socket) do
    {:noreply, socket}
  end

  def handle_in("message", %{"body" => body}, socket) do
    %{user: user, room_pid: room_pid} = socket.assigns

    message = Room.Server.add_message(room_pid, user.id, body)

    broadcast!(socket, "message", message)
    
    {:noreply, socket}
  end

  def handle_in("isTyping", %{"isTyping" => typing?}, socket) do
    broadcast_from!(socket, "userTyping", %{userId: socket.assigns.user.id, isTyping: typing?})

    {:noreply, socket}
  end

  def handle_in("isPlaying", %{"isPlaying" => playing?}, socket) do
    broadcast!(socket, "isPlaying", %{isPlaying: playing?})

    {:noreply, socket}
  end

  def handle_in("seek", %{"timestamp" => timestamp}, socket) do
    broadcast!(socket, "seek", %{timestamp: timestamp})

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast_from!(socket, "userJoin", socket.assigns.user)

    {:noreply, socket}
  end
end
