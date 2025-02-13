defmodule Xplore.Utils.Math do
  alias Xplore.Utils.Graphs

  defmodule Haversine do
    # Earth's radius in km
    @radius 6371

    @doc "Haversine formula to calculate distance between two lat/lng points"
    @spec distance(Graphs.coordinates_tuple(), Graphs.coordinates_tuple()) :: float()
    def distance({lat1, lon1}, {lat2, lon2}) do
      lat1 = :math.pi() * lat1 / 180
      lon1 = :math.pi() * lon1 / 180
      lat2 = :math.pi() * lat2 / 180
      lon2 = :math.pi() * lon2 / 180

      dlat = lat2 - lat1
      dlon = lon2 - lon1

      a =
        :math.pow(:math.sin(dlat / 2), 2) +
          :math.cos(lat1) * :math.cos(lat2) * :math.pow(:math.sin(dlon / 2), 2)

      c = 2 * :math.atan2(:math.sqrt(a), :math.sqrt(1 - a))
      @radius * c
    end
  end
end
