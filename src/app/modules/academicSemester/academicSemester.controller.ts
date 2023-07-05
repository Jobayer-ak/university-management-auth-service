import { NextFunction, Request, Response } from 'express';
import { academicSemesteService } from './academicSemester.service';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await academicSemesteService.createSemester(
      academicSemesterData
    );

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createSemester,
};
