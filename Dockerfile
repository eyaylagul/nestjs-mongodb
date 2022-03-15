# Builder Docker configurations
FROM node:14.17-alpine

WORKDIR /application
ADD . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD ["node", "/application/dist/main"]
