# Use the official Elixir image as the base image
FROM elixir:latest

# Install Hex and Rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Set the working directory
WORKDIR /app

# Copy the mix.exs and mix.lock files
COPY ./apps/core/mix.exs ../apps/core/mix.lock ./
COPY ../../whc-sites.csv .

# Install Elixir dependencies
RUN mix deps.get

# Copy the rest of the application code
COPY ./apps/core .

# Compile the application
RUN mix release

# Expose port 4000
EXPOSE 4000

# Set the entrypoint to start the Phoenix server
CMD ["mix", "run", "--no-halt"]