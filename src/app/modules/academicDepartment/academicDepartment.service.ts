import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDeparment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDeparment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartmentService = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //   console.log(andConditions);

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDeparment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDeparment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDeparmtmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDeparment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateDeparmtmentService = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDeparment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  return result;
};

const deleteDeparmtmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDeparment.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicDeparmentService = {
  createDepartment,
  getAllDepartmentService,
  getSingleDeparmtmentService,
  updateDeparmtmentService,
  deleteDeparmtmentService,
};
