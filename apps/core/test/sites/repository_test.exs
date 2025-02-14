defmodule Xplore.Sites.RepositoryTest do
  # Should be false, otherwise, one mock can interefere in the other
  use ExUnit.Case, async: false
  import Mock

  alias Xplore.Sites.Repository
  alias SurrealEx.Domain.{ExecutionSuccess, ExecutionError}

  describe "get_all/1" do
    test "returns a list of sites on success" do
      page = 1
      page_size = 10

      query_result = %ExecutionSuccess{
        result: [%{"id" => 1, "name" => "Site 1"}, %{"id" => 2, "name" => "Site 2"}]
      }

      with_mock SurrealEx, query: fn _db, _query, _params -> {:ok, query_result} end do
        assert {:ok, result} = Repository.get_all(page: page, page_size: page_size)
        assert result == query_result
      end
    end

    test "returns an error on failure" do
      page = 1
      page_size = 10
      query_error = %ExecutionError{error: "Some error"}

      with_mock SurrealEx, query: fn _db, _query, _params -> {:error, query_error} end do
        assert {:error, result} = Repository.get_all(page: page, page_size: page_size)
        assert result == query_error
      end
    end
  end

  describe "get_all_by_ids/1" do
    test "returns a list of sites on success" do
      ids = ["site1", "site2"]

      query_result = %ExecutionSuccess{
        result: [
          %{"id_no" => "site1", "name" => "Site 1"},
          %{"id_no" => "site2", "name" => "Site 2"}
        ]
      }

      with_mock SurrealEx, query: fn _db, _query, _params -> {:ok, query_result} end do
        assert {:ok, result} = Repository.get_all_by_ids(ids)
        assert result == query_result
      end
    end

    test "returns an error on failure" do
      ids = ["site1", "site2"]
      query_error = %ExecutionError{error: "Some error"}

      with_mock SurrealEx, query: fn _db, _query, _params -> {:error, query_error} end do
        assert {:error, result} = Repository.get_all_by_ids(ids)
        assert result == query_error
      end
    end
  end
end
