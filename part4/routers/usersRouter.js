const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

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
  const allUsers = await User.find({})
  response.json(allUsers.map((u) => u.toJSON()))
})

module.exports = usersRouter
