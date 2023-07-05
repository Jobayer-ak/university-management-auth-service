import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

// router.use('/users', UserRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);

export default router;
