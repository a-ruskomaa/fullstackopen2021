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
    user: user._id,
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

  if (user._id.toString() === blog.user.toString()) {
    blog.delete()
    response.sendStatus(204)
  } else {
    response.status(401).json({ error: 'not authorized' })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = {
    ...request.body,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.sendStatus(404)
  }
})

module.exports = blogsRouter
