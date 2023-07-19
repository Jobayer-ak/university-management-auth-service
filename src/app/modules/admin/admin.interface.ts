import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName; // embaded object;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference_id
  profileImage?: string;
  designation: string;
};

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'Male' | 'Female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
};
