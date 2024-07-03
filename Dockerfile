FROM node:16

ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV PORT=80

COPY .docker/.npmrc /root/.npmrc

WORKDIR /app

COPY .npmrc .npmrc
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --production && yarn cache clean

RUN rm -f .npmrc /root/.npmrc

COPY dist .

EXPOSE 80

CMD ["/bin/sh", "-c", "yarn start"]
