defmodule Xplore.Sites.Repository do
  @type get_all_args :: [
          page: integer(),
          page_size: integer()
        ]
  @spec get_all(get_all_args) ::
          {:ok, SurrealEx.Domain.ExecutionSuccess} | {:error, SurrealEx.Domain.ExecutionError}
  def get_all(args) when is_list(args) do
    page = Keyword.get(args, :page)
    page_size = Keyword.get(args, :page_size)

    SurrealEx.query(
      Xplore.Database,
      to_string("SELECT * FROM whc_sites LIMIT #{page_size} START #{page * page_size}"),
      %{}
    )
  end

  @spec get_all_by_ids(list(String.t())) ::
          {:ok, SurrealEx.Domain.ExecutionSuccess} | {:error, SurrealEx.Domain.ExecutionError}
  def get_all_by_ids(ids) when is_list(ids) do
    ids_query_string = ids |> Enum.map(&("\"" <> &1 <> "\"")) |> Enum.join(", ")

    SurrealEx.query(
      Xplore.Database,
      to_string("SELECT * FROM whc_sites WHERE id_no IN [#{ids_query_string}]"),
      %{}
    )
  end
end
