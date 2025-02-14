import Config

import_config("utils.exs")

config :surrealdb_ex,
  connection_config: [
    hostname: System.get_env("SURREALDB_HOSTNAME", "localhost"),
    port: System.get_env("SURREALDB_PORT", "8000"),
    username: System.get_env("SURREALDB_USERNAME", "root"),
    password: System.get_env("SURREALDB_PASSWORD", "root"),
    database: System.get_env("SURREALDB_DATABASE", "xplore"),
    namespace: System.get_env("SURREALDB_NAMESPACE", "default")
  ]
