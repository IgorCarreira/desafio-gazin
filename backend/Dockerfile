FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

EXPOSE 3030

CMD ["npm", "run", "dev"]
