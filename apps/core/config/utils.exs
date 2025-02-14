import Config

if config_env() in [:dev, :test] do
  for path <- [".env", ".env.#{config_env()}"] do
    path = Path.join(__DIR__, "..") |> Path.join(path) |> Path.expand()

    if File.exists?(path) do
      File.read!(path)
      |> String.split(~r/\n/)
      |> Enum.filter(&(String.trim(&1) != ""))
      |> Enum.filter(&(String.starts_with?(&1, "#") == false))
      |> Enum.each(fn line ->
        treated_line =
          String.trim(line)
          |> String.split("=", parts: 2, trim: true)

        [key, value] = treated_line
        value = String.replace(value, ~r/"/, "")
        System.put_env(key, value)
      end)
    end
  end
end
