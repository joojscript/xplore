defmodule Xplore.Utils.Graphs do
  alias Xplore.Utils.Math.Haversine

  @doc "Find the shortest path using a greedy nearest-neighbor approach"
  @type coordinates_tuple :: {latitude :: float(), longitude :: float()}
  @spec find_shortest_path(list(coordinates_tuple())) :: list(integer())
  def find_shortest_path([]), do: []
  def find_shortest_path([unique_element]), do: [unique_element]

  def find_shortest_path(coords) when is_list(coords) do
    graph = build_graph(coords)
    indexes = Map.keys(graph)
    start = hd(indexes)
    greedy_path(graph, start, indexes -- [start], [start])
  end

  defp build_graph(coords) do
    for {p1, i} <- Enum.with_index(coords), into: %{} do
      {i,
       for {p2, j} <- Enum.with_index(coords), i != j, into: %{} do
         {j, Haversine.distance(p1, p2)}
       end}
    end
  end

  defp greedy_path(_graph, _current, [], path), do: path

  defp greedy_path(graph, current, remaining, path) do
    case Enum.min_by(remaining, fn next -> Map.get(graph[current], next, :infinity) end, fn ->
           nil
         end) do
      # No valid next node found, return current path
      nil -> path
      next -> greedy_path(graph, next, List.delete(remaining, next), path ++ [next])
    end
  end
end
