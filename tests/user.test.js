const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { testUser, testUserId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a user', async() => {
    const response = await request(app).post('/users').send({
        name: "Bruno",
        email: "brunopagno@example.com",
        password: "1234567"
    }).expect(201)

    // Assert the database was changed correctly
    const user = User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Asset the response body is correct
    expect(response.body).toMatchObject({
        user: {
            name: "Bruno",
            email: "brunopagno@example.com",
        }
    })
})

test('Should Login an existing user', async()=> {
    const response  = await request(app).post('/users/login').send({
        email: 'foo@bar.com',
        password: 'foobar!!!'
    }).expect(200)
    
    const user = await User.findById(testUserId);
    expect(user).not.toBeNull()
})

test('Should NOT Login an nonexistent user', async()=> {
    await request(app).post('/users/login').send({
        email: 'iamnotfoo@bar.com',
        password: 'iamnotfoobar!!!'
    }).expect(400)
})

test('Should get profile for user', async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT get profile for user', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should Delete a user profile', async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(testUserId);
    expect(user).toBeNull()
})


test('Should NOT Delete a user profile', async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload an avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/me.png')
        .expect(200)
    const user = await User.findById(testUserId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should Update the user', async() => {
    request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            name: "BarFoo"
        })
        .expect(200)
    const user = await User.findById(testUserId);
    expect(user.name == "BarFoo")
})


test('Should NOT Update nonexisting fields in the user', async() => {
    request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            location: "Brazil"
        })
        .expect(200)
    const user = await User.findById(testUserId);
    expect(user.name == "BarFoo")
})