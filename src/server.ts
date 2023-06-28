import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './share/logger'
import { Server } from 'http'

async function main() {
  let server: Server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', err => {
    // console.log(
    //   'Unhandled Rejection is detected, we are closing our server...!'
    // )
    if (server) {
      server.close(() => {
        errorlogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
