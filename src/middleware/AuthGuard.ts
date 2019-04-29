import { NextFunction, Request, Response } from 'express';
import { db } from '~/services/db';
import { handleCatchError, handleError } from '~/utils/error';
import { extractToken, verifyToken } from '~/utils/token';

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = await extractToken(req);
    const decoded = await verifyToken(token);

    const user = await db.execute(
      `
        SELECT * FROM user_account WHERE id = UUID_TO_BIN(?)
      `,
      [decoded.id],
    );

    if (!user) {
      throw handleError(
        401,
        'UNAUTHORIZED_NO_USER',
        'no user found when authorized',
      );
    }

    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    return next(handleCatchError(error));
  }
};
