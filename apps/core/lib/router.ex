defmodule Xplore.Router do
  use Plug.Router

  alias Xplore.Sites
  alias Xplore.Utils.Web

  plug(:match)
  plug(:dispatch)
  plug(Web.Plugs.ExtractMetaHeaders)

  forward("/sites", to: Sites.Router)

  match _ do
    send_resp(conn, 404, "Not found")
  end
end
