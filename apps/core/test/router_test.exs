defmodule Xplore.RouterTest do
  use ExUnit.Case, async: true
  use Plug.Test

  alias Xplore.Router

  @opts Router.init([])

  test "GET /<UNRECORNIZED_ROUTE returns 404>" do
    conn = conn(:get, "/")
    conn = Router.call(conn, @opts)

    assert conn.status == 404
    assert conn.resp_body == "Not found"
  end
end
