const request = require('supertest');
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUser, testUserId, testUser2, testUser2Id, setupDatabase, taskOne, taskTwo,taskThree} = require('./fixtures/db')

beforeEach(setupDatabase) 

test('Should create a task for user', async ()=> {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            description: "FooBar",
            completed: true
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('Should fetch user tasks', async()=> {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(1)
})

test('Should not delete other user tasks', async()=> {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${testUser2.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
        


})

