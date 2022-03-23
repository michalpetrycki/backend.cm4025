FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 8000

# ENTRYPOINT [ "npm", "run" ]

CMD ["npm", "run"]