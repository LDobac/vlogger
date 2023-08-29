FROM node:20-alpine3.17 as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV=production
RUN yarn posts
RUN yarn build

FROM nginx:1.25.2-alpine as deploy

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
