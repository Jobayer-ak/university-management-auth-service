import { RequestHandler } from 'express';
import { academicSemesteService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;

    const result = await academicSemesteService.createSemester(
      academicSemesterData
    );

    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  createSemester,
};
