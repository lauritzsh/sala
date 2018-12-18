defmodule PlayerTest do
  use ExUnit.Case
  doctest Player

  test "player is a struct" do
    player = Player.new()

    assert player.video_id == nil
    assert player.playing == false
    assert player.current_time == 0
  end

  test "can play and pause video" do
    player = Player.new()
    assert player.playing == false

    player = Player.play(player)
    assert player.playing == true

    player = Player.pause(player)
    assert player.playing == false
  end

  test "can progress playback" do
    player = Player.new()
    assert player.current_time == 0

    player = Player.progress(player)
    assert player.current_time == 1
  end

  test "can seek into video" do
    player = Player.new()
    assert player.current_time == 0

    player = Player.seek(player, 20)
    assert player.current_time == 20
  end

  test "can change video id" do
    player = Player.new()
    assert player.video_id == nil

    player = Player.change_id(player, "https://www.youtube.com/watch?v=hLljd8pfiFg")
    assert player.video_id == "hLljd8pfiFg"

    player = Player.change_id(player, "dQw4w9WgXcQ")
    assert player.video_id == "dQw4w9WgXcQ"

    player = Player.change_id(player, "blah")
    assert player.video_id == "dQw4w9WgXcQ"
  end
end
