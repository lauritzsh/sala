defmodule SalaWeb.RoomChannel do
  require Logger
  
  use Phoenix.Channel

  def join("room:" <> name, _message, socket) do
    room_pid = Room.Cache.find_room(name)

    socket = socket
      |> assign(:room_pid, room_pid)

    Room.Server.join(room_pid)
    room = Room.Server.get(room_pid)

    send(self(), :after_join)

    {:ok, room, socket}
  end

  def terminate(_reason, socket) do
    %{room_pid: room_pid} = socket.assigns

    Room.Server.leave(room_pid)

    broadcast_from!(socket, "userLeave", %{})
    
    :stop
  end

  def handle_in("message", %{"body" => body}, socket) do
    %{room_pid: room_pid}  = socket.assigns

    Room.Server.add_message(room_pid, body)

    broadcast!(socket, "message", %{body: body})
    
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast_from!(socket, "userJoin", %{})

    {:noreply, socket}
  end
end
