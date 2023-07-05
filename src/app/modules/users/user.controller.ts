import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../share/catchAsync';

// import userService from './user.service'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const result = await UserService.createUserService(user);

    next();

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
