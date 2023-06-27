import { Request, Response } from 'express'
import userService from './user.service'
// import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await userService.createUserService(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user!',
      error: error,
    })
  }
}

export default {
  createUser,
}