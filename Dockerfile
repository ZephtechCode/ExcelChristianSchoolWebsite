# Use a multi-stage build to optimize the final image
# Stage 1 - Build Strapi and Remix
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for root and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy Strapi and Remix directories and install their dependencies
COPY strapi/package.json strapi/yarn.lock ./strapi/
COPY remix/package.json remix/yarn.lock ./remix/
RUN yarn workspace strapi install && yarn workspace remix install

# Copy the entire app into the container
COPY . .

# Build Strapi
RUN yarn workspace strapi build

# Build Remix
RUN yarn workspace remix build

# Stage 2 - Serve the applications
FROM node:18

# Set working directory
WORKDIR /app

# Copy over built files and node_modules from the build stage
COPY --from=build /app /app

# Set environment variables for Strapi
ENV HOST=0.0.0.0 \
    PORT=1337 \
    APP_KEYS=Fqlaf5U/SilV7+IraYd00Q==,X2r45zHD5jm/rbui2xhRnQ==,h6HC30MjqC/DgJO9Fhbd4Q==,XnsGqdf/GHvLHyRbXozPOQ== \
    API_TOKEN_SALT=XONOuRQ1UVO4yvM5yw6p7g== \
    ADMIN_JWT_SECRET=w6ZfM4OftIw9FyPL3XEplA== \
    TRANSFER_TOKEN_SALT=tmxQnznXpdgFOm7GynE8iA==

# Set environment variables for PostgreSQL connection for Strapi
ENV DATABASE_CLIENT=postgres \
    DATABASE_HOST=website-postgres-do-user-18183023-0.i.db.ondigitalocean.com \
    DATABASE_PORT=25060 \
    DATABASE_NAME=defaultdb \
    DATABASE_USERNAME=doadmin \
    DATABASE_PASSWORD=AVNS_pQIxZ490iOLYdTtJR6R \
    DATABASE_SSL=true

# Set environment variables for Remix
ENV STRAPI_API_KEY=0a8a517c97bfe1f056afdaf642b28f91328ba65c5618b55755f4e902afc14c1c0cb2ad0eac553c4d1364944ae5c66d23abce27cac0cade1da6c6e774f5f01d9edb4d64dc9a2f3062e34eb90147426ff7b8c22cc8686c9eb1d31aa9892848eb978546b80d136ed2cedd61b914ab30e410629dc0dfa0f8de40ddea2ed77d341d3b \
    STRAPI_URL=http://localhost:1337

# Expose port 1337 for Strapi and 3000 for Remix
EXPOSE 1337 3000

# Start both applications with the correct commands
CMD (cd strapi && yarn start) & (cd remix && yarn start)
