FROM node:14.15.1

RUN mkdir /mypay-api

WORKDIR /mypay-api

COPY package.json /mypay-api/

RUN yarn

COPY . .
EXPOSE 3030

CMD ["node", "./bin/www"]