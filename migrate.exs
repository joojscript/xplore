alias Xplore.Database

file_path = Path.join([__DIR__, "whc-sites.csv"])
config_path = Path.join([__DIR__, "config", "config.exs"])

Mix.install([
  {:surrealdb_ex, "~> 0.0.2"},
  {:csv, "~> 3.2"}
])

Config.Reader.read!(config_path, env: :dev)

connection_config = [
  hostname: System.get_env("SURREALDB_HOSTNAME", "localhost"),
  port: System.get_env("SURREALDB_PORT", "8000"),
  username: EnvUtils.get_env!("SURREALDB_USERNAME"),
  password: EnvUtils.get_env!("SURREALDB_PASSWORD"),
  database: System.get_env("SURREALDB_DATABASE", "xplore"),
  namespace: EnvUtils.get_env!("SURREALDB_NAMESPACE")
]

{:ok, pid} = SurrealEx.start_link(connection_config)

File.stream!(file_path, [:trim_bom, encoding: :utf8])
|> CSV.decode(escape_max_lines: 100)
|> Stream.map(fn {:ok, row} -> row end)
# |> Stream.map(&IO.inspect/1)
|> Stream.map(fn list ->
  SurrealEx.create(pid, "whc_sites", %{
    unique_number: Enum.at(list, 0)
  })
end)
|> Stream.run()
