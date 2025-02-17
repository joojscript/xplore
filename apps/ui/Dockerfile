FROM node:lts-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Set environment variables for development
ENV HOST=0.0.0.0
ENV PORT=$FRONTEND_PORT

# Expose the development port
EXPOSE $FRONTEND_PORT

# Run the Astro development server
CMD ["sh", "-c", "pnpm dev --host --port $FRONTEND_PORT"]