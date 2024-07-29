FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/server/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install -g npm@9.6.1
RUN npm install
ARG CI_COMMIT_SHA
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA

COPY ./ .
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run" ,"start"]
