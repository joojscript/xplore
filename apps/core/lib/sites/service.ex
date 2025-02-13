defmodule Xplore.Sites.Service do
  alias Xplore.Utils.Web
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
end
