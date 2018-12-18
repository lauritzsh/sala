defmodule RoomTest do
  use ExUnit.Case
  doctest Room

  test "room has a player" do
    room_server = Room.Cache.find_room(:bob)
    room = Room.Server.get(room_server)

    assert room.player == Player.new()
  end

  test "room expires" do
    room = Room.Cache.find_room(:bob)

    Process.sleep(:timer.seconds(2))

    new_room = Room.Cache.find_room(:bob)

    assert room != new_room
  end
end
