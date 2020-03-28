const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const testUserId = new mongoose.Types.ObjectId()
const testUser = new User({
    _id: testUserId,
    name: 'Foo',
    email: 'foo@bar.com',
    password: 'foobar!!!',
    tokens: [{
        token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET )
    }]
})

const testUser2Id = new mongoose.Types.ObjectId()
const testUser2 = new User({
    _id: testUser2Id,
    name: 'Bar',
    email: 'foo@bar2.com',
    password: 'foobar!!!',
    tokens: [{
        token: jwt.sign({ _id: testUser2Id }, process.env.JWT_SECRET )
    }]
})


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: testUserId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: false,
    owner: testUser2Id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: testUser2Id
}

const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(testUser).save()
    await new User(testUser2).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    testUser,
    testUserId,
    testUser2,
    testUser2Id,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}