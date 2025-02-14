defmodule Core.MixProject do
  use Mix.Project

  def project do
    [
      app: :core,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {Core.Application, []}
    ]
  end

  defp deps do
    [
      {:surrealdb_ex, "~> 0.0.2"},
      {:bandit, "~> 1.0"},
      {:cors_plug, "~> 3.0"},
      {:poison, "~> 6.0"},
      {:exconstructor, "~> 1.2.11"},
      {:mock, "~> 0.3.0", only: :test}
    ]
  end
end
