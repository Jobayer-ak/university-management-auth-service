import { z } from 'zod';

const createDeparmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required!',
    }),
  }),
});

const updateDeparmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createDeparmentZodSchema,
  updateDeparmentZodSchema,
};
