import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

// import userService from './user.service'

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;

    const result = await UserService.createStudentService(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully!',
      data: result,
    });

    next();
  }
);

export const UserController = {
  createStudent,
};
