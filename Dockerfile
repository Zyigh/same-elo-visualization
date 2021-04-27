FROM node:14-alpine AS builder

WORKDIR /elo
ADD / .
RUN npm install
RUN npm run build

FROM nginx:1.19.2-alpine

EXPOSE 80

COPY --from=builder /elo/dist/ /usr/share/nginx/html
