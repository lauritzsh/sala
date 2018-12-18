defmodule SalaWeb.RoomChannel do
  require Logger

  use Phoenix.Channel

  def join("room:" <> name, _message, socket) do
    user = name
    |> Room.find_or_create()
    |> Room.join()

    room = name
    |> Room.pause()
    |> Room.get()

    socket =
      socket
      |> assign(:name, name)
      |> assign(:user, user)

    send(self(), :after_join)

    {:ok, room, socket}
  end

  def terminate(_reason, socket) do
    %{user: user, name: name} = socket.assigns

    Room.leave(name, user.id)

    broadcast_from!(socket, "CHAT_USER_LEAVE", %{userId: user.id})

    :stop
  end

  def handle_in("CHAT_ADD_MESSAGE", %{"body" => body}, socket) do
    %{user: user, name: name} = socket.assigns

    message = Room.add_message(name, user.id, body)

    broadcast!(socket, "CHAT_ADD_MESSAGE", message)

    {:noreply, socket}
  end

  def handle_in("CHAT_USER_TYPING", %{"isTyping" => typing?}, socket) do
    broadcast_from!(socket, "CHAT_USER_TYPING", %{userId: socket.assigns.user.id, isTyping: typing?})

    {:noreply, socket}
  end

  def handle_in("PLAYER_PLAY", _, socket) do
    Room.play(socket.assigns.name)

    broadcast!(socket, "PLAYER_PLAY", %{})

    {:noreply, socket}
  end

  def handle_in("PLAYER_PAUSE", _, socket) do
    Room.pause(socket.assigns.name)

    broadcast!(socket, "PLAYER_PAUSE", %{})

    {:noreply, socket}
  end

  def handle_in("PLAYER_SEEK", %{"timestamp" => timestamp}, socket) do
    Room.seek(socket.assigns.name, timestamp)

    broadcast!(socket, "PLAYER_SEEK", %{timestamp: timestamp})

    {:noreply, socket}
  end

  def handle_in("PLAYER_NEW_VIDEO", %{"url" => url}, socket) do
    Room.new_video(socket.assigns.name, url)

    broadcast!(socket, "PLAYER_NEW_VIDEO", %{url: url})

    {:noreply, socket}
  end

  def handle_in(message, params, socket) do
    Logger.warn("Got unknown message #{inspect(message)} with #{inspect(params)}")

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast_from!(socket, "PLAYER_PAUSE", %{})
    broadcast_from!(socket, "CHAT_USER_JOIN", socket.assigns.user)

    {:noreply, socket}
  end
end
