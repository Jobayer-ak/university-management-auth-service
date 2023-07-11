import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFacultyService = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllFacultiesService = async (): Promise<IAcademicFaculty[]> => {
  const result = await AcademicFaculty.find({});
  return result;
};

export const AcademicFacultyService = {
  createFacultyService,
  getAllFacultiesService,
};
