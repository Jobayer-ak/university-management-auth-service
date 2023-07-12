/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendReponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../share/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await AcademicFacultyService.createFacultyService(
    academicFacultyData
  );

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  console.log('filters: ', filters);
  console.log('pagination options: ', paginationOptions);

  const result = await AcademicFacultyService.getAllFacultiesService(
    filters,
    paginationOptions
  );

  sendReponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.getSingleFacultyService(id);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
};
