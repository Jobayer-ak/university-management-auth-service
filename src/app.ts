import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import usersRouter from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
// console.log(app.get('env'))
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully')
})

export default app
