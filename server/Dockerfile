FROM node:10-alpine


COPY  . ./app
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python && npm --build-from-source install bcrypt && npm install

EXPOSE 3333
CMD [ "npm", "start" ]
