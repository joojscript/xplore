defmodule Xplore.Domain.Errors do
  defmodule BadRequest do
    use ExConstructor

    @type t :: %__MODULE__{
            message: String.t() | binary()
          }

    defstruct [:message]
  end

  defmodule InternalServerError do
    use ExConstructor

    @type t :: %__MODULE__{
            message: String.t() | binary()
          }

    defstruct [:message]

    def new, do: new(%{message: "Internal Server Error"})
  end
end
