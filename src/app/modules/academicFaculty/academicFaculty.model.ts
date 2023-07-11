import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.interface';

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicSemesterModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
