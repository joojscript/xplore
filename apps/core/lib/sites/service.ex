defmodule Xplore.Sites.Service do
  alias Xplore.Utils.Web
  alias Xplore.Utils.Graphs
  alias Xplore.Domain
  alias Xplore.Sites
  alias Xplore.Sites.Repository

  @type get_all_args :: [
          page: integer()
        ]
  @spec get_all(get_all_args) ::
          {:ok, list(Sites.Domain.WHCSite)} | {:error, Domain.Errors.BadRequest}
  def get_all(args \\ %{}) when is_list(args) do
    page_size = Web.Constants.default_page_size()
    page = args |> Keyword.get(:page) || raise "Page not found"

    query_response = Repository.get_all(page: page, page_size: page_size)

    case query_response do
      {:ok, result} ->
        objects =
          result.result
          |> Enum.at(0)
          |> Map.get("result")
          # Not mandatory, as the context is simple, but security-worthy
          |> Enum.map(&Sites.Domain.WHCSite.new/1)

        {:ok, objects}

      {:error, reason} ->
        exception = Domain.Errors.BadRequest.new(reason)

        {:error, exception}

      _ ->
        {:error, Domain.Errors.InternalServerError.new()}
    end
  end

  @type get_optimed_route_args :: [
          sites: list(String.t() | binary())
        ]
  @spec get_optimized_route(get_optimed_route_args) ::
          {:ok, list(String.t() | binary)} | {:error, map()}
  def get_optimized_route(sites: sites) do
    query_response = Repository.get_all_by_ids(sites)

    case query_response do
      {:ok, result} ->
        sites =
          result.result
          |> Enum.at(0)
          |> Map.get("result")

        sites_coordinates =
          Enum.map(sites, fn %{"latitude" => latitude, "longitude" => longitude} ->
            {Float.parse(latitude) |> elem(0), Float.parse(longitude) |> elem(0)}
          end)

        shortest_path = Graphs.find_shortest_path(sites_coordinates)

        shortest_path_sites =
          Enum.map(shortest_path, fn site_index ->
            Enum.at(sites, site_index)
          end)

        {:ok, shortest_path_sites}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
