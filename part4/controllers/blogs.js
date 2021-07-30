const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) {
    return response.sendStatus(400)
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes ?? 0,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.sendStatus(404)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.sendStatus(204)
})

module.exports = blogsRouter
