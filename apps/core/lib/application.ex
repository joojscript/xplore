defmodule Core.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {SurrealEx, [name: Xplore.Database, schene: :http]},
      {Bandit, plug: Xplore.Router}
    ]

    opts = [strategy: :one_for_one, name: Core.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
