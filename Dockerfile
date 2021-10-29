FROM node:12.18.2 as builder

WORKDIR /source
COPY . ./
RUN yarn --prodution
RUN yarn build

FROM nginx:latest
WORKDIR /source
RUN rm -f /etc/nginx/conf.d/*
COPY --from=builder /source/dist/ ./dist/
COPY --from=builder /source/deploy/nginx.conf /etc/nginx/conf.d/
CMD nginx -g 'daemon off;'
