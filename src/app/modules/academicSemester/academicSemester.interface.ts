import { Model } from 'mongoose';

export type IAcademicsemester = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<IAcademicsemester>;
