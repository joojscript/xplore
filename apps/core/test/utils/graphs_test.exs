defmodule Xplore.Utils.GraphsTest do
  use ExUnit.Case, async: true

  alias Xplore.Utils.Graphs

  describe "find_shortest_path/1" do
    test "returns the correct path for a simple set of coordinates" do
      coords = [
        {10.0, 20.0},
        {30.0, 40.0},
        {50.0, 60.0}
      ]

      expected_path = [0, 1, 2]
      assert Graphs.find_shortest_path(coords) == expected_path
    end

    test "returns the correct path for a more complex set of coordinates" do
      coords = [
        {10.0, 20.0},
        {15.0, 25.0},
        {30.0, 40.0},
        {50.0, 60.0},
        {5.0, 10.0}
      ]

      expected_path = [0, 1, 4, 2, 3]
      assert Graphs.find_shortest_path(coords) == expected_path
    end

    test "returns an empty path for an empty list of coordinates" do
      coords = []

      expected_path = []
      assert Graphs.find_shortest_path(coords) == expected_path
    end

    test "returns a single element path for a single coordinate" do
      coords = [{10.0, 20.0}]

      assert Graphs.find_shortest_path(coords) == coords
    end
  end
end
