FROM node:16 as builder

WORKDIR /srv

COPY tsconfig.json 			./tsconfig.json
COPY tsconfig.build.json 	./tsconfig.build.json

COPY package.json 		./package.json
COPY src				./src

RUN yarn config set network-timeout 600000 -g

RUN yarn install \
    --frozen-lockfile \
    --production

RUN yarn build

##############################################

FROM node:16

WORKDIR /srv

COPY tsconfig.json 			./tsconfig.json
COPY tsconfig.build.json 	./tsconfig.build.json

COPY package.json 		./package.json

COPY --from=builder   /srv/dist 		./dist
COPY --from=builder /srv/node_modules ./node_modules

EXPOSE 3000

CMD yarn start:prod