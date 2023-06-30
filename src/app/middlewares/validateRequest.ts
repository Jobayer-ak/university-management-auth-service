import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// import userService from './user.service'

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;

// middleware --> validateRequest(userZodSchema) => async (req, res, next)
