defmodule Room do
  alias Room.{Chat, Player, User}

  @derive Jason.Encoder
  defstruct name: nil, users: [], chat: Chat.new(), player: Player.new()

  def new(name) do
    %__MODULE__{name: name}
  end

  def join(%__MODULE__{users: users} = room, %User{} = new_user) do
    new_users = [new_user | users]

    %__MODULE__{room | users: new_users}
  end

  def leave(%__MODULE__{users: users} = room, user_id) do
    new_users = Enum.reject(users, fn user -> user.id == user_id end)

    %__MODULE__{room | users: new_users}
  end
end
