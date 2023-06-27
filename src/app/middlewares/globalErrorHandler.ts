import { Request, Response, NextFunction } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something Went Wrong!'
  const errorMessages: IGenericErrorMessage[] = []

  //   res.status().json({ err: err })

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : '',
  })

  next()
}

export default globalErrorHandler

// path :
// message:
