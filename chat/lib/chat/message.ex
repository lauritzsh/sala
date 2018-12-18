defmodule Chat.Message do
  @derive Jason.Encoder
  defstruct body: nil, seconds: nil, date: nil

  def new(body, seconds, date) do
    safe_body =
      body
      |> String.trim()
      |> Phoenix.HTML.html_escape()
      |> Phoenix.HTML.safe_to_string()

    %__MODULE__{body: safe_body, seconds: seconds, date: date}
  end
end
