import { NextFunction, Request, Response } from 'express';
import { academicSemesteService } from './academicSemester.service';
import catchAsync from '../../../share/catchAsync';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await academicSemesteService.createSemester(
      academicSemesterData
    );

    next();

    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createSemester,
};
