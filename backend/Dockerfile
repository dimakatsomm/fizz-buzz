
# Backend Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run db:migration:run
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
