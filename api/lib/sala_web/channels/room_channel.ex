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
    broadcast_from!(socket, "USER_LEAVE", %{userId: user.id})
    
    :stop
  end

  def handle_in("NEW_MESSAGE", %{"body" => ""}, socket) do
    {:noreply, socket}
  end

  def handle_in("NEW_MESSAGE", %{"body" => body}, socket) do
    %{user: user, room_pid: room_pid} = socket.assigns

    message = Room.Server.add_message(room_pid, user.id, body)

    broadcast!(socket, "NEW_MESSAGE", message)
    
    {:noreply, socket}
  end

  def handle_in("USER_TYPING", %{"isTyping" => typing?}, socket) do
    broadcast_from!(socket, "USER_TYPING", %{userId: socket.assigns.user.id, isTyping: typing?})

    {:noreply, socket}
  end

  def handle_in("VIDEO_PLAYING", %{"isPlaying" => playing?}, socket) do
    broadcast!(socket, "VIDEO_PLAYING", %{isPlaying: playing?})

    Room.Server.play(socket.assigns.room_pid, playing?)

    {:noreply, socket}
  end

  def handle_in("VIDEO_SEEK", %{"timestamp" => timestamp}, socket) do
    broadcast!(socket, "VIDEO_SEEK", %{timestamp: timestamp})

    Room.Server.seek(socket.assigns.room_pid, timestamp)

    {:noreply, socket}
  end

  def handle_in("NEW_VIDEO", %{"url" => url}, socket) do
    broadcast!(socket, "NEW_VIDEO", %{url: url})

    Room.Server.new_video(socket.assigns.room_pid, url)

    {:noreply, socket}
  end

  def handle_in(message, params, socket) do
    Logger.warn "Got unknown message #{inspect message} with #{inspect params}"
    
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    Room.Server.play(socket.assigns.room_pid, false)

    broadcast!(socket, "VIDEO_PLAYING", %{isPlaying: false})
    broadcast_from!(socket, "USER_JOIN", socket.assigns.user)

    {:noreply, socket}
  end
end
