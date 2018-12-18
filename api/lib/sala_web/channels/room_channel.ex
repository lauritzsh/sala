defmodule SalaWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> room_name, _message, socket) do
    chat_id = Room.chat(room_name)

    socket = socket
      |> assign(:chat, chat_id)

    messages = Chat.messages(chat_id) |> Enum.reverse()

    {:ok, %{messages: messages}, socket}
  end

  def handle_in("message", %{"body" => body}, socket) do
    %{chat: chat} = socket.assigns

    date = DateTime.utc_now()
    seconds = 0

    message = Chat.new_message(body, seconds, date)
    Chat.add(chat, message)
    
    broadcast!(socket, "message", message)
    
    {:noreply, socket}
  end
end
