defmodule Room do
  alias Room.{Chat, Player}
  
  def find_or_create(name) do
    Room.DynamicSupervisor.find_or_create(name)
    name
  end

  def get(name) do
    %{chat: chat(name), player: player(name)}
  end

  def chat(name) do
    Chat.get(name)
  end
  
  def join(name) do
    Chat.join(name)
  end
  
  def add_message(name, user_id, body) do
    Chat.add_message(name, user_id, body)
  end

  # TODO: is there a better place to put this logic?
  def leave(name, user_id) do
    users_left = name
    |> Chat.leave(user_id)
    |> Chat.count_users()

    if users_left == 0 do
      Player.pause(name)
    end

    name
  end

  def player(name) do
    Player.get(name)
  end

  def play(name) do
    Player.play(name)
  end

  def pause(name) do
    Player.pause(name)
  end

  def seek(name, timestamp) do
    Player.seek(name, timestamp)
  end

  def new_video(name, url) do
    Player.new_video(name, url)
  end
end
