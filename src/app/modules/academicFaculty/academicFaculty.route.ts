import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  AcademicFacultyController.getAllFaculties
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteFaculty
);

export const AcademicFacultyRoutes = router;
