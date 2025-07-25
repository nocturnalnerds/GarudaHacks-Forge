FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i

EXPOSE 5173

RUN npm run build

CMD ["npm", "run", "preview"]
