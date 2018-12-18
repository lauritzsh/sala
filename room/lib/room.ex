defmodule Room do
  def new(room_name, url) do
    do_new(room_name, url, exists?(room_name))
  end

  defp do_new(room_name, _url, _exists? = true) do
    {:error, "Room '#{room_name}' already exists."}
  end

  defp do_new(room_name, _url, _exists? = false) do
    chat =
      via_chat_tuple(room_name)
      |> Chat.new()

    # player =
    #   via_player_tuple(room_name)
    #   |> Player.new(url)

    # {:ok, %{chat: chat, player: player}}
    {:ok, %{chat: chat}}
  end

  def chat(room_name), do: via_chat_tuple(room_name)

  # def player(room_name), do: via_player_tuple(room_name)

  defp via_chat_tuple(room_name) do
    {:via, Registry, {Room.ChatRegistry, room_name}}
  end

  # defp via_player_tuple(room_name) do
  #   {:via, Registry, {Room.PlayerRegistry, room_name}}
  # end
end
