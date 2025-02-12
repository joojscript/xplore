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

defmodule EnvUtils do
  @moduledoc """
  A temporary module, built to help with the config phase of the application.
  """

  @doc """
  Retrieves an environment variable or raises an error if it is not found.
  It tries to replicate the behavior of System.get_env/1, but raises an error
  if the environment variable is not found.
  """
  def get_env!(key) do
    case System.get_env(key) do
      nil -> raise "Environment variable #{key} not found"
      value -> value
    end
  end
end
