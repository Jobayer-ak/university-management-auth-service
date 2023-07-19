import { z } from 'zod';

const createmanagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
  }),
});

const updatemanagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createmanagementDepartmentZodSchema,
  updatemanagementDepartmentZodSchema,
};
