const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(result)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  if (!(request.body.title && request.body.url)) {
    return response.sendStatus(400)
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes ?? 0,
    user: user,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    blogs: 0,
  })

  if (blog) {
    response.json(blog)
  } else {
    response.sendStatus(404)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.sendStatus(404)
  }

  if (!wasAddedBy(user, blog)) {
    return response.status(401).json({ error: 'not authorized' }).send()
  }

  await blog.delete()
  response.sendStatus(204)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id).populate('user', {
    blogs: 0,
  })

  Object.entries(request.body).forEach(([key, value]) => {
    if (key !== 'user' && key !== 'id') {
      if (!wasAddedBy(user, blog) && key !== 'likes' && blog[key] !== value) {
        return response.status(401).json({ error: 'not authorized' }).send()
      }
      blog[key] = value
    }
  })

  const savedBlog = await blog.save()

  if (savedBlog) {
    response.json(savedBlog)
  } else {
    response.sendStatus(404)
  }
})

const wasAddedBy = (user, blog) => {
  return user._id.toString() === blog.user._id.toString()
}

module.exports = blogsRouter
