defmodule Xplore.Utils.MathTest do
  use ExUnit.Case, async: true

  alias Xplore.Utils.Math.Haversine

  describe "distance/2" do
    test "calculates the correct distance between two points" do
      point1 = {10.0, 20.0}
      point2 = {30.0, 40.0}

      # Expected distance calculated using the Haversine formula
      expected_distance = 3040.6028180681

      assert_in_delta Haversine.distance(point1, point2), expected_distance, 0.0001
    end

    test "returns 0 for the same point" do
      point = {10.0, 20.0}

      assert Haversine.distance(point, point) == 0.0
    end

    test "calculates the correct distance between two other points" do
      # London
      point1 = {51.5074, -0.1278}
      # New York
      point2 = {40.7128, -74.0060}

      # Expected distance calculated using the Haversine formula
      expected_distance = 5570.222179737958

      assert_in_delta Haversine.distance(point1, point2), expected_distance, 0.0001
    end
  end
end
