const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const errors = await validateUser(body)

  if (errors.length > 0) {
    return response.status(400).json(errors).send()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser.toJSON())
})

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { user: 0 })
  response.json(allUsers.map((u) => u.toJSON()))
})

async function validateUser(user) {
  const errors = []

  const userExists = await User.exists({ username: user.username })

  if (userExists) {
    errors.push({ error: 'Username already exists' })
  }
  if (user.username.length < 3) {
    errors.push({ error: 'Username too short' })
  }
  if (user.password.length < 3) {
    errors.push({ error: 'Password too short' })
  }

  return errors
}

module.exports = usersRouter
