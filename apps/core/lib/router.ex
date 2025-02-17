defmodule Xplore.Router do
  use Plug.Router
  use Plug.ErrorHandler

  alias Xplore.Sites
  alias Xplore.Utils.Web

  plug(CORSPlug,
    headers: [
      "Content-Type",
      "Accept",
      "Origin",
      "User-Agent",
      "DNT",
      "Cache-Control",
      "Keep-Alive",
      "X-Requested-With",
      "X-Page"
    ]
  )

  plug(:match)
  plug(:dispatch)

  forward("/sites", to: Sites.Router)

  get "/" do
    {total_uptime, _} = :erlang.statistics(:wall_clock)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, %{status: "UP", uptime: total_uptime} |> Poison.encode!())
  end

  @impl Plug.ErrorHandler
  def handle_errors(conn, %{kind: _kind, reason: reason, stack: _stack}) do
    Web.Response.internal_server_error(conn, reason)
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
