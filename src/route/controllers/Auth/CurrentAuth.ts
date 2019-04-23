import { Request, Response } from 'express';

export const CurrentAuth = (req: Request, res: Response): void => {
  delete req.user.password;

  res.send({ token: req.token, user: req.user });
};
