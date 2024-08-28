
# Frontend Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY ./package*.json /app/
RUN npm ci

COPY . /app
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
