FROM node:16.17.0-bullseye-slim
WORKDIR /usr/server/app

COPY ./package.json ./
RUN yarn install
COPY ./ .
RUN yarn build
ENV NODE_ENV=production
CMD ["yarn","start"]