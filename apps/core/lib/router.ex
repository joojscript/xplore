# defmodule Xplore.CORSPlug do
#   import Plug.Conn

#   def init(opts), do: opts

#   def call(conn, _opts) do
#     conn
#     |> put_resp_header("Access-Control-Allow-Origin", "*")
#     |> send_resp(200, "")
#   end
# end

defmodule Xplore.Router do
  use Plug.Router

  alias Xplore.Sites

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

  get "/sites" do
    conn
    |> send_resp(200, "Hello, world!")
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
