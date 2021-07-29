const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs } = require('./helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('has content type set as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a blog has attribute called "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('has content type set as json', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('saves the correct blog', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    const response = await api.post('/api/blogs').send(testBlog)

    expect(response.body)
      .toHaveProperty('title', testBlog.title)
      .toHaveProperty('author', testBlog.author)
      .toHaveProperty('url', testBlog.url)
      .toHaveProperty('likes', testBlog.likes)
  })

  test('increases the total blog count by one', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    await api.post('/api/blogs').send(testBlog)
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('sets default value of 0 if likes not set', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
    }

    const response = await api.post('/api/blogs').send(testBlog)

    expect(response.body).toHaveProperty('likes', 0)
  })

  test('returns bad request if title not set', async () => {
    const testBlog = {
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    await api.post('/api/blogs').send(testBlog).expect(400)
  })

  test('returns bad request if url not set', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      likes: 13,
    }

    await api.post('/api/blogs').send(testBlog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
