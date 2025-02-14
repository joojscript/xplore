defmodule Xplore.Utils.Web do
  import Plug.Conn

  defmodule Response do
    def ok(conn, body \\ %{}) when is_map(body) or is_struct(body) or is_list(body) do
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(200, body |> Poison.encode!())
    end

    def bad_request(conn, body \\ %{}) when is_map(body) or is_struct(body) or is_list(body) do
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(400, body |> Poison.encode!())
    end
  end

  defmodule Constants do
    def default_page_size, do: 10
  end
end
