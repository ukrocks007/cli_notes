FROM node:20.11.1

WORKDIR /cli

COPY package.json /cli
COPY package-lock.json /cli

RUN npm ci

COPY *.js .

ENTRYPOINT ["node", "index.js"]
CMD []
