FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3030

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm run build && npm run start"]
