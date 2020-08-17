FROM node:12-alpine

COPY ["package.json", "yarn.lock", "./"] 

COPY . . 

WORKDIR '/seven-apps'

RUN yarn install

ENTRYPOINT [ "yarn", "start" ]
