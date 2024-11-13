const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

const PORT = 8000
app.listen(PORT,() => {
  logger.info('server is running on port',PORT)
})