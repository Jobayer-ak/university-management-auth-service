import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicsemester,
} from './academicSemester.interface';

const academicSemesterModel = new Schema<IAcademicsemester>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AcademicSemester = model<IAcademicsemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterModel
);
