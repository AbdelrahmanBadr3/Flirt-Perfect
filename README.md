-Clone or download

  $ https://github.com/AbdelrahmanBadr3/Flirt-Perfect.git
 $ npm i

-Project structure:
LICENSE
Package.json
Server/
        Package.json
    .env(to create .env, check client/
                        package.json

-Usage (run fullstack app on your machine)
Prerequirements:
    ï    MongoDB
    ï    Node ^10.0.0
    ï    npm
 

Client-side usage(PORT: 3333)
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

Server-side usage(PORT: 3000)
-Prepare your secret
run the script at the first level:
(You need to add a JWT_SECRET in .env to connect to MongoDB)
// in the root level
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./server/src/.env
Start
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ node index.js// run it locally

-Docker:
Build docker : docker-compose build
Run:docker-compose run
-Docker-compose:
We have 3 containers , One for the client side"Front-End" , another one for the server side "Back-end" and the third one for the datebase "Mongo"
In the backend container:image from node server , alpine server (linux) to run the container and expose on 3333 and it has a command npm start
In the frontend container: same as the backend container, but expose on different port which is 3000 and map it to 80 in docker-compose
In the database container:using mongo image and expose it on 27017



The docker file for the front end"Client-side":




-











The first line is node version 10,alpine:linux distribution ìThe loading of the image is lightî
then we copy the file from the current directory to image directory in the folder app and then in the third line : we set the current directory to the new app , fourth line : to install python , fifth line:npm install 
and the 6th line it exposes on port 3000. and finally we Run.

Docker file for the Back-end(Server side):













  

    Same as the front end (Client -side) but it exposes on port 3333 and we install also python then         we install Bcrypt library that is used for Encryption.







Docker-compose:

        












Client side:
It has container name, 
then build:
context ì is the pathî  
the name of the docker file and itís directory
it has the image
Ports :mapping port (3000 to 80)
volumes: to mount the containers

Server side:
It has container name, 
then build:
context ì is the pathî  
the name of the docker file and itís directory
it has the image
Ports :mapping port (3333 to 3333)
volumes: to mount the containers
links depends on mongo image 

Mongo:
Container name
Image
Ports : mapping 27017:27017


Deployment:
The server and the client-side are deployed on ìDigital Oceanî using IP:206.189.73.177






-Dependencies:
Client-side:
 "bootstrap-material-icons": "^2.2.0",
    "firebase": "^6.6.0",
    "font-awesome": "^4.7.0",
    "jwt-decode": "^2.2.0",
    "react": "^16.8.0",
    "react-bootstrap": "^1.0.0-beta.16",
    "react-datepicker": "^2.10.1",
    "react-dom": "^16.8.6",
    "react-firebaseui": "^4.0.0",
    "react-fontawesome": "^1.7.1",
    "react-inlinesvg": "^0.8.4",
    "react-moment": "^0.9.6",
    "react-redux": "^6.0.0",
    "react-router-dom": "^5.0.0",
    "react-scripts": "^2.1.8",
    "react-select": "^2.4.3",
    "react-transition-group": "^4.3.0",
    "redux-thunk": "^2.3.0",
    "store": "^2.0.12",
    "styled-components": "^4.2.0",
    "redux": "^4.0.0",
    "moment": "^2.24.0"

Server-side:
"bcrypt": "^3.0.5",
        "bcryptjs": "^2.4.3",
        "bootstrap": "^4.3.1",
        "cors": "^2.8.5",
        "crypto": "^1.0.1",
        "crypto-js": "^3.1.9-1",
        "express": "^4.16.4",
        "i": "^0.3.6",
        "joi": "^14.3.1",
        "joi-objectid": "^2.0.0",
        "jsonwebtoken": "^8.5.1",
        "jwt-decode": "^2.2.0",
        "mongoose": "^5.4.22",
        "mongoose-type-url": "^1.0.5",
        "passport": "^0.4.0",
        "passport-jwt": "^4.0.0",
        "passport-local": "^1.0.0"

-Config file:
in the backend "Server-side":it contains the passport file which is used for authentication and it contains the connection with the database which is mongoDB
in the front-end"Client-side": It contains the firebase configuration file and URL that is used Back-end front-end connection.


