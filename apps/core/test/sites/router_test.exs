defmodule Xplore.Sites.RouterTest do
  # Should be false, otherwise, one mock can interefere in the other
  use ExUnit.Case, async: false
  use Plug.Test

  alias Xplore.Router

  import Mock

  @opts Router.init([])

  describe "GET /" do
    test "returns a successful response with default page" do
      conn = conn(:get, "/sites")
      conn = Router.call(conn, @opts)

      assert conn.status == 200
      assert conn.resp_body != nil
    end

    test "returns a successful response with specified page" do
      conn = conn(:get, "/sites") |> put_req_header("x-page", "2")
      conn = Router.call(conn, @opts)

      assert conn.status == 200
      assert conn.resp_body != nil
    end

    test "returns a successful response with invalid x-page header" do
      conn = conn(:get, "/sites") |> put_req_header("x-page", "invalid")

      assert_raise Plug.Conn.WrapperError, ~r"Invalid page", fn ->
        Router.call(conn, @opts)
      end
    end
  end

  describe "GET /optimized-route" do
    test "returns a successful response" do
      conn = conn(:get, "/sites/optimized-route")

      assert_raise Plug.Conn.WrapperError, ~r"No sites provided", fn ->
        Router.call(conn, @opts)
      end
    end

    test "returns a successful response with query params" do
      with_mock Xplore.Sites.Service, get_optimized_route: fn [sites: ids] -> {:ok, ids} end do
        conn = conn(:get, "/sites/optimized-route?sites=%5B%22site1%22,%22site2%22%5D")
        conn = Router.call(conn, @opts)

        assert conn.status == 200
        assert conn.resp_body != nil
      end
    end
  end
end
