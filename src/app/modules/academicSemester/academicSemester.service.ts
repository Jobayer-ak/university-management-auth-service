import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicsemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const createSemester = async (
  payload: IAcademicsemester
): Promise<IAcademicsemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemestersService = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicsemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;

  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesteService = {
  createSemester,
  getAllSemestersService,
};
