defmodule Core.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {SurrealEx, [name: Xplore.Database]},
      {Bandit, plug: Xplore.Router, port: System.get_env("PORT", "4000")}
    ]

    opts = [strategy: :one_for_one, name: Core.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
