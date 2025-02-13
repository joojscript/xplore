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
    unique_number: Enum.at(list, 0),
    id_no: Enum.at(list, 1),
    rev_bis: Enum.at(list, 2),
    name_en: Enum.at(list, 3),
    name_fr: Enum.at(list, 4),
    name_es: Enum.at(list, 5),
    name_ru: Enum.at(list, 6),
    name_ar: Enum.at(list, 7),
    name_zh: Enum.at(list, 8),
    short_description_en: Enum.at(list, 9),
    short_description_fr: Enum.at(list, 10),
    short_description_es: Enum.at(list, 11),
    short_description_ru: Enum.at(list, 12),
    short_description_ar: Enum.at(list, 13),
    short_description_zh: Enum.at(list, 14),
    justification_en: Enum.at(list, 15),
    justification_fr: Enum.at(list, 16),
    date_inscribed: Enum.at(list, 17),
    secondary_dates: Enum.at(list, 18),
    danger: Enum.at(list, 19),
    date_end: Enum.at(list, 20),
    danger_list: Enum.at(list, 21),
    longitude: Enum.at(list, 22),
    latitude: Enum.at(list, 23),
    area_hectares: Enum.at(list, 24),
    C1: Enum.at(list, 25),
    C2: Enum.at(list, 26),
    C3: Enum.at(list, 27),
    C4: Enum.at(list, 28),
    C5: Enum.at(list, 29),
    C6: Enum.at(list, 30),
    N7: Enum.at(list, 31),
    N8: Enum.at(list, 32),
    N9: Enum.at(list, 33),
    N10: Enum.at(list, 34),
    criteria_txt: Enum.at(list, 35),
    category: Enum.at(list, 36),
    category_short: Enum.at(list, 37),
    states_name_en: Enum.at(list, 38),
    states_name_fr: Enum.at(list, 39),
    states_name_es: Enum.at(list, 40),
    states_name_ru: Enum.at(list, 41),
    states_name_ar: Enum.at(list, 42),
    states_name_zh: Enum.at(list, 43),
    region_en: Enum.at(list, 44),
    region_fr: Enum.at(list, 45),
    iso_code: Enum.at(list, 46),
    udnp_code: Enum.at(list, 47),
    transboundary: Enum.at(list, 48)
  })
end)
|> Stream.run()
