const express = require('express');
require('./db/mongoose');
// Models
const Task = require('./models/task');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();

app.use(express.json())
app.use(userRouter);    
app.use(taskRouter);

module.exports = app