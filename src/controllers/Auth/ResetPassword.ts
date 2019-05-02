import { NextFunction, Request, Response } from 'express';
import mysql from 'mysql2';
import { db } from '~/providers/db';
import { Token } from '~/queries/Token';
import { UserAccount } from '~/queries/UserAccount';
import { handleCatchError, handleError } from '~/utils/error';
import { hashPassword } from '~/utils/password';

export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { password, confirmPassword, userId, token } = req.body;

  try {
    const [tokenFoundRows] = await db.execute(Token.findOneResetPasswordToken, [
      userId,
    ]);
    const tokenFound = tokenFoundRows[0];

    if (tokenFound && tokenFound.token !== token) {
      throw handleError(
        400,
        'INVALID_PASSWORD_TOKEN',
        'password token is invalid',
      );
    }

    if (password !== confirmPassword) {
      throw handleError(400, 'PASSWORD_NOT_MATCH', 'password does not match');
    }

    const hashedPassword = await hashPassword(password);

    await db.execute(
      mysql.format(UserAccount.updateOneById, [
        {
          password: hashedPassword,
        },
        userId,
      ]),
    );

    return res.send({
      success: true,
      message: 'password has been reset',
    });
  } catch (error) {
    return next(handleCatchError(error));
  }
};
