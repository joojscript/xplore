defmodule Core.ApplicationTest do
  use ExUnit.Case, async: true

  alias Core.Application

  test "application starts and children are supervised" do
    # Verify that the children processes are started and supervised
    assert Supervisor.which_children(Core.Supervisor)
           |> Enum.any?(fn
             {SurrealEx.Socket, _, _, _} -> true
             _ -> false
           end)

    assert Supervisor.which_children(Core.Supervisor)
           |> Enum.any?(fn
             {{Bandit, _}, _, _, _} -> true
             _ -> false
           end)

    # Stop the application
    :ok = Application.stop(:normal)
  end
end
