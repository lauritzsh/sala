defmodule Room.Chat.Impl do
  alias Room.Chat.{Message, User}

  @symbols ~w(🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵)

  def new() do
    %{users: [], symbols: @symbols, messages: []}
  end

  def join(chat) do
    [symbol | symbols] = chat.symbols
    new_user = User.new(symbol)
    users = [new_user | chat.users]

    {new_user, %{chat | users: users, symbols: symbols}}
  end

  def count_users(chat) do
    Enum.count(chat.users)
  end

  def add_message(chat, user_id, body) do
    new_message = Message.new(user_id, body)
    messages = [new_message | chat.messages]

    {new_message, %{chat | messages: messages}}
  end

  def last_message(chat) do
    List.first(chat.messages)
  end

  def leave(chat, id) do
    old_symbols =
      chat.users
      |> Enum.filter(fn u -> u.id === id end)
      |> Enum.map(fn u -> u.symbol end)

    users = Enum.reject(chat.users, fn u -> u.id === id end)
    symbols = chat.symbols ++ old_symbols

    %{chat | users: users, symbols: symbols}
  end
end
