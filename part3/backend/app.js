const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')


const uri = config.MONGODB_URI

mongoose.set('strictQuery',false)

logger.info('Connecting to MONGO DB')

mongoose.connect(uri)
  .then(result => {
    logger.info('Connected to MONGO DB')
  })
  .catch(error  => {
    logger.error(error.message)
  })


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/notes',notesRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app

