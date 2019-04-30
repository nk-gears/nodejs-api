import { NextFunction, Request, Response } from 'express';
import * as Token from '~/queries/Token';
import { db } from '~/services/db';
import { handleCatchError, handleError } from '~/utils/error';

export const CheckPasswordToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { token } = req.body;

  try {
    const [tokenCheckRows] = await db.execute(
      Token.findOneResetPasswordTokenByToken,
      [token],
    );
    const tokenCheck = tokenCheckRows[0];

    if (!tokenCheck) {
      throw handleError(
        400,
        'INVALID_PASSWORD_TOKEN',
        'password token is invalid',
      );
    }

    const dateNow = new Date();

    if (tokenCheck && dateNow > tokenCheck.expires_in) {
      throw handleError(
        400,
        'PASSWORD_TOKEN_EXPIRED',
        'password token is expired',
      );
    }

    return res.send({
      valid: true,
      token,
      user_account_id: tokenCheck.user_account_id,
    });
  } catch (error) {
    return next(handleCatchError(error));
  }
};
