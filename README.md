# Welcome to Task Manager API
    I make this project by following the Andrew Mead NodeJs Udemy Course( https://www.udemy.com/course/the-complete-nodejs-developer-course-2/ ).
    This Project is a *Task Manager* application using MongoDb include many different Node Modules and also use of Some API's such as SendGrid

## Environment variables
Please make sure to setup a config folder with the variables

PORT=*Setup your port for the application run on Express Module*

SENDGRID_API_KEY=*This is a API key provided by sendgrid.com (you can have a free plan by registering)*

MONGODB_URL=*MongoDb Database URL*

JWT_SECRET=*Json Web Token Secret Key*

Ex: ./config/dev.env
```
PORT=3004
SENDGRID_API_KEY=MyAPIKey
MONGODB_URL = mongodb://127.0.0.1:27017/task-manager-api
JWT_SECRET=thisIsASecretKey
```

## Setup
```
$ cd ./task-manager
$ npm i
```
You can Use:
```
$  npm run dev (nodemon)
$  npm start (node)
$  npm run test (test using Jest.js)
```
