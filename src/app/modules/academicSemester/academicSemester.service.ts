import { IAcademicsemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicsemester
): Promise<IAcademicsemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesteService = {
  createSemester,
};
