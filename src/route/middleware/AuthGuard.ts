import { NextFunction, Request, Response } from 'express';
import { UserAccount } from '~/database/entities/UserAccount';
import { createCatchError, createError } from '~/utils/error';
import { extractToken, verifyToken } from '~/utils/token';

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await extractToken(req);
    const decoded = await verifyToken(token);

    const user = await UserAccount.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw createError(
        401,
        'UNAUTHORIZED_NO_USER',
        'no user found when authorized',
      );
    }

    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    return next(createCatchError(error));
  }
};
