import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import pick from '../../../share/pick';
import { adminFilterableFields } from './admin.constants';
import { paginationFields } from '../../../constants/pagination';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdminService(
    filters,
    paginationOptions
  );

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all admins successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const AdminController = { getAllAdmin };
