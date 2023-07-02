import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicsemester,
} from './academicSemester.interface';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterModel = new Schema<IAcademicsemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: month,
    },
  },
  { timestamps: true }
);

export const AcademicSemester = model<IAcademicsemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterModel
);
