# Use a base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the Remix app
COPY . .

# Build Remix
RUN yarn build

# Start Remix
CMD ["yarn", "start"]
