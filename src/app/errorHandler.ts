import { Express, NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const appErrorHandler = (app: Express): void => {
  app.use(
    (
      err: HttpError,
      req: Request,
      res: Response,
      next: NextFunction, // eslint-disable-line
    ): void => {
      res.status(err.status).send({
        error: {
          status: err.status,
          code: err.code,
          message: err.message,
        },
      });
    },
  );
};
