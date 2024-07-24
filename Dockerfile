# Build stage
FROM node:18.19.0-bullseye-slim AS build
WORKDIR /usr/server/app
COPY ./package.json ./
RUN yarn install
COPY ./ .
RUN yarn build

# Final stage
FROM node:18.19.0-bullseye-slim
WORKDIR /usr/server/app
COPY --from=build /usr/server/app .
ENV NODE_ENV=production
CMD ["yarn","start"]