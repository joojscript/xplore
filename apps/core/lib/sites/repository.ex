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
end
