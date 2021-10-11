const config = require('./config/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const blogsRouter = require('./routers/blogsRouter')
const usersRouter = require('./routers/usersRouter')
const loginRouter = require('./routers/loginRouter')
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
} = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routers/testingRouter')
  app.use('/api/testing', testingRouter)
}
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
