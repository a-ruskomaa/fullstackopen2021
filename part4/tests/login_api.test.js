const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialUser, getInitialUserModel } = require('./helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const initialUser = await getInitialUserModel()
  await initialUser.save()
})

describe('POST /api/login', () => {
  test('has content type set as json', async () => {
    await api
      .post('/api/login')
      .send(initialUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns jwt token', async () => {
    const response = await api.post('/api/login').send(initialUser)

    expect(response.body).toHaveProperty('token')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
