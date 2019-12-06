FROM node:10-alpine

COPY  . ./app
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python 
RUN npm install

EXPOSE 3000
CMD [ "npm","start" ]