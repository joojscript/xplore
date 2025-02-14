defmodule Xplore.Sites.ServiceTest do
  # Should be false, otherwise, one mock can interefere in the other
  use ExUnit.Case, async: false
  import Mock

  alias Xplore.Sites.Service
  alias Xplore.Sites.Repository

  describe "get_all/1" do
    test "returns a list of sites on success" do
      page = 1
      sites = [%{"id" => 1, "name" => "Site 1"}, %{"id" => 2, "name" => "Site 2"}]

      with_mock Repository, get_all: fn _args -> {:ok, %{result: [%{"result" => sites}]}} end do
        assert {:ok, result} = Service.get_all(page: page)
        assert length(result) == 2
      end
    end

    test "returns an error on failure" do
      page = 1

      with_mock Repository,
        get_all: fn _args -> {:error, %SurrealEx.Domain.ExecutionError{error: "Some Error"}} end do
        assert {:error, _} = Service.get_all(page: page)
      end
    end
  end

  describe "get_optimized_route/1" do
    test "returns the optimized route on success" do
      sites = ["site1", "site2"]

      site_data = [
        %{"id_no" => "site1", "latitude" => "10.0", "longitude" => "20.0"},
        %{"id_no" => "site2", "latitude" => "30.0", "longitude" => "40.0"}
      ]

      with_mock Repository,
        get_all_by_ids: fn _sites -> {:ok, %{result: [%{"result" => site_data}]}} end do
        with_mock Xplore.Utils.Graphs, find_shortest_path: fn _coords -> [0, 1] end do
          assert {:ok, ["site1", "site2"]} = Service.get_optimized_route(sites: sites)
        end
      end
    end

    test "returns an error on failure" do
      sites = ["site1", "site2"]

      with_mock Repository, get_all_by_ids: fn _sites -> {:error, "Some error"} end do
        assert {:error, _} = Service.get_optimized_route(sites: sites)
      end
    end
  end
end
