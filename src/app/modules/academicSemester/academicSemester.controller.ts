import { NextFunction, Request, Response } from 'express';
import { AcademicSemesteService } from './academicSemester.service';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { IAcademicsemester } from './academicSemester.interface';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesteService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicsemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    });

    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    // console.log(filters);

    const result = await AcademicSemesteService.getAllSemestersService(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicsemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesteService.getSingleSemesterService(id);

    sendResponse<IAcademicsemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!',
      data: result,
    });

    next();
  }
);

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
