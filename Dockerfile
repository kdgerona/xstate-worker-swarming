FROM node:12

WORKDIR /var/app

COPY package.json ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "start"]