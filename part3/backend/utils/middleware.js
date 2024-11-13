const logger = require('./logger')

const requestLogger = (req,res,next) => {
  logger.info('Method: ',req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ',req.body)
  logger.info('---')
  next()
}

const errorHandler = (error,req,res,next) => {
  console.log(error.message)
  if(error.name==='CastError'){
    return res.status(400).send({ error:'malformed ID' })
  }
  else if(error.name==='ValidationError'){
    return res.status(400).json({ error:error.split(':') })
  }
  next(error)
}

const unknownEndPoint = (req,res,next) => {
  res.status(404).send({ error:'page not found' })
}


module.exports = {
  requestLogger,
  errorHandler,
  unknownEndPoint
}
