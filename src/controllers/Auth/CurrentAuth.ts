import { Request, Response } from 'express';

export const CurrentAuth = (req: Request, res: Response): void => {
  res.send({ token: req.token, user: req.user });
};
