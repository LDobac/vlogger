FROM node:20-alpine3.17 as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY .yarn .yarn
RUN ls -al

RUN yarn set version berry
RUN yarn install

COPY . .

ENV NODE_ENV=production
ENV TZ="Asia/Seoul"

RUN yarn posts
RUN yarn build

FROM nginx:1.25.2-alpine as deploy

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
