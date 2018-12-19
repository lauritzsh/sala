defmodule Chat.Message do
  @derive Jason.Encoder
  defstruct user_id: nil, body: nil

  def new(user_id, body) do
    %__MODULE__{user_id: user_id, body: body}
  end
end
