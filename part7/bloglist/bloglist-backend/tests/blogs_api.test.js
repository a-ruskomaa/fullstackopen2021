const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {
  initialBlogs,
  blogsInDb,
  getInitialUserModel,
  getJwtForUser,
} = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

var testUser

beforeAll(async () => {
  await User.deleteMany({})
  const initialUser = await getInitialUserModel()
  testUser = await initialUser.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(
    initialBlogs.map((blog) => ({ ...blog, user: testUser }))
  )
})

describe('GET /api/blogs', () => {
  test('has content type set as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a blog has an attribute called "id"', async () => {
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

    const token = await getJwtForUser(testUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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
    const token = await getJwtForUser(testUser)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)

    expect(response.body).toHaveProperty('title', testBlog.title)
    expect(response.body).toHaveProperty('author', testBlog.author)
    expect(response.body).toHaveProperty('url', testBlog.url)
    expect(response.body).toHaveProperty('likes', testBlog.likes)
  })

  test('increases the total blog count by one', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    const token = await getJwtForUser(testUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)

    expect(await blogsInDb()).toHaveLength(initialBlogs.length + 1)
  })

  test('sets default value of 0 if likes not provided', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
    }

    const token = await getJwtForUser(testUser)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)

    expect(response.body).toHaveProperty('likes', 0)
  })

  test('returns bad request if title not set', async () => {
    const testBlog = {
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
    }

    const token = await getJwtForUser(testUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })

  test('returns bad request if url not set', async () => {
    const testBlog = {
      title: 'Dummy Title',
      author: 'Dummy Author',
      likes: 13,
    }

    const token = await getJwtForUser(testUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })
})

describe('GET /api/blogs/:id', () => {
  test('response has content type set as json', async () => {
    const blogs = await blogsInDb()
    const id = blogs[0].id

    await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('response has correct content', async () => {
    const blogs = await blogsInDb()
    const firstBlog = blogs[0]

    const response = await api.get(`/api/blogs/${firstBlog.id}`)

    expect(response.body).toHaveProperty('title', firstBlog.title)
    expect(response.body).toHaveProperty('author', firstBlog.author)
    expect(response.body).toHaveProperty('url', firstBlog.url)
    expect(response.body).toHaveProperty('likes', firstBlog.likes)
  })

  test('returns 404 if not found', async () => {
    const nonExistentId = '6103b57241195549152232b7'

    await api.get(`/api/blogs/${nonExistentId}`).expect(404)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('returns status code of 204 if succesfully deleted', async () => {
    const blogs = await blogsInDb()
    const id = blogs[0].id

    const token = await getJwtForUser(testUser)

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })

  test('returns not authorized for missing token', async () => {
    const blogs = await blogsInDb()
    const id = blogs[0].id

    await api.delete(`/api/blogs/${id}`).expect(401)
  })

  test('deletes the correct post', async () => {
    const blogs = await blogsInDb()
    const firstBlog = blogs[0]

    const token = await getJwtForUser(testUser)

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set('Authorization', `bearer ${token}`)

    const updatedBlogs = await blogsInDb()

    const blogIds = updatedBlogs.map((blog) => blog.id)

    expect(blogIds).not.toContain(firstBlog.id)
    expect(blogIds).toHaveLength(blogs.length - 1)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('response has content type set as json', async () => {
    const blogs = await blogsInDb()
    const firstBlog = blogs[0]

    const token = await getJwtForUser(testUser)

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(firstBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('updates the correct post', async () => {
    const blogs = await blogsInDb()
    const firstBlog = blogs[0]
    const updatedBlog = {
      ...firstBlog,
      likes: 42,
    }

    const token = await getJwtForUser(testUser)

    const result = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)

    expect(result.body).toHaveProperty('likes', 42)

    const updatedBlogInDb = (await blogsInDb()).find(
      (blog) => (blog.id = firstBlog.id)
    )

    expect(updatedBlogInDb).toHaveProperty('likes', 42)
  })

  test('returns not authorized for missing token', async () => {
    const blogs = await blogsInDb()
    const firstBlog = blogs[0]
    const updatedBlog = {
      ...firstBlog,
      likes: 42,
    }

    await api.put(`/api/blogs/${firstBlog.id}`).send(updatedBlog).expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
