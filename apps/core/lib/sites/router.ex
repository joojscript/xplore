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

  # plug(Web.Plugs.ExtractMetaHeaders)
  plug(:dispatch)

  get "/" do
    # In case of unsuccessful parse, let it raise
    page = (get_req_header(conn, "x-page") |> List.first() || "1") |> Integer.parse() |> elem(0)

    response = Sites.Service.get_all(page: page)

    case response do
      {:ok, objects} ->
        Web.Response.ok(conn, objects)

      {:error, exception} ->
        Web.Response.bad_request(conn, exception)
    end
  end

  get "/optimized-route" do
    params = conn.query_params

    # In case of error, let it raise (I'm not implementing validations for this test, but could...)
    sites = Map.get(params, "sites") |> Poison.decode!()

    response = Sites.Service.get_optimized_route(sites: sites)

    case response do
      {:ok, route} ->
        Web.Response.ok(conn, route)

      {:error, exception} ->
        Web.Response.bad_request(conn, exception)
    end
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
