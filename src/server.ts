import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './share/logger'
import { Server } from 'http'

// uncaught error detection
process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database', err)
  }

  // undhandled rejection
  process.on('unhandledRejection', error => {
    errorlogger.error(error)
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// signal termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM is recieved')

  if (server) {
    server.close()
  }
})
