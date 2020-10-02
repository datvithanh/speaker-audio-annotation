FROM node:12.13.1
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["node", "server.js"]