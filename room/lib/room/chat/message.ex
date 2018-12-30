defmodule Room.Chat.Message do
  def new(user_id, body) do
    %{user_id: user_id, body: body}
  end
end
