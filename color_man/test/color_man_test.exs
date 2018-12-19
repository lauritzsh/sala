defmodule ColorManTest do
  use ExUnit.Case
  doctest ColorMan

  test "greets the world" do
    assert ColorMan.hello() == :world
  end
end
