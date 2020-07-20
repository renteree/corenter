FROM node:14-alpine

WORKDIR /build
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

# Direct usage of node instead npm for raising performance
CMD ["node", "dist/index.js"]
