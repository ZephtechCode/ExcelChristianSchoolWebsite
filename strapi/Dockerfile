# strapi/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

ENV PORT=1337
EXPOSE 1337

CMD ["yarn", "start"]
