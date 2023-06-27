import express, { Application } from 'express'
import cors from 'cors'

import usersRouter from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', usersRouter)

// class (error format)

// // testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Its an Error!')
//   next('Its an Error') // global middleware handler
// })

// global error handler
app.use(globalErrorHandler)

export default app
