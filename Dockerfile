FROM node:18


WORKDIR /app


COPY package*.json ./


RUN npm install

RUN npm rebuild bcrypt

COPY . .

EXPOSE 8080

CMD ["npm","start"]