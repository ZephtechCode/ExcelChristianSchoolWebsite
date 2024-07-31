# remix/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV PORT=3000
EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
