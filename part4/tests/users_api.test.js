const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { usersInDb, getInitialUser } = require('./helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const initialUser = await getInitialUser()
  await initialUser.save()
})

describe('GET /api/users', () => {
  test('has content type set as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct number of users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('a user has an attribute called "id"', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
  })

  test('password hash is not returned"', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].passwordHash).not.toBeDefined()
  })
})

describe('POST /api/users', () => {
  test('has content type set as json', async () => {
    const testUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'supersecretpassword',
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('saves the correct user', async () => {
    const testUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'supersecretpassword',
    }

    const response = await api.post('/api/users').send(testUser)

    expect(response.body)
      .toHaveProperty('username', testUser.username)
      .toHaveProperty('name', testUser.name)
  })

  test('increases the total user count by one', async () => {
    const testUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'supersecretpassword',
    }

    await api.post('/api/users').send(testUser)

    expect(await usersInDb()).toHaveLength(2)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
