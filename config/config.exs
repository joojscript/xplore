import Config

import_config("utils.exs")

config :surrealdb_ex,
  connection_config: [
    hostname: System.get_env("SURREALDB_HOSTNAME", "localhost"),
    port: System.get_env("SURREALDB_PORT", "8000"),
    username: EnvUtils.get_env!("SURREALDB_USERNAME"),
    password: EnvUtils.get_env!("SURREALDB_PASSWORD"),
    database: System.get_env("SURREALDB_DATABASE", "xplore"),
    namespace: EnvUtils.get_env!("SURREALDB_NAMESPACE")
  ]
