import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { IManagementDepartment } from './managementDepartment.interface';
import pick from '../../../share/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constants';
import { paginationFields } from '../../../constants/pagination';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;

  const result = await ManagementDepartmentService.createDepartmentService(
    departmentData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created management successfully !',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementDepartmentService.getAllDepartmentService(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartment,
};
