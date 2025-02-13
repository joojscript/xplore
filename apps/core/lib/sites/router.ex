defmodule Xplore.Sites.Router do
  alias Xplore.Utils.Web
  alias Xplore.Sites
  use Plug.Router

  plug(:match)

  plug(Plug.Parsers,
    parsers: [:json],
    pass: ["application/json"],
    json_decoder: Poison
  )

  plug(Web.Plugs.ExtractMetaHeaders)

  plug(:dispatch)

  get "/" do
    # In case of unsuccessful parse, let it raise
    page = conn |> get_req_header("page") |> Enum.at(0) |> Integer.parse() |> elem(0)

    response = Sites.Service.get_all(page: page)

    case response do
      {:ok, objects} ->
        Web.Response.ok(conn, objects)

      {:error, exception} ->
        Web.Response.bad_request(conn, exception)
    end
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
