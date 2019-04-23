import { NextFunction, Request, Response } from 'express';
import { PasswordToken } from '~/database/entities/PasswordToken';
import { UserAccount } from '~/database/entities/UserAccount';
import { createCatchError, createError } from '~/utils/error';
import { hashPassword } from '~/utils/password';

export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { password, confirmPassword, userId, token } = req.body;

  try {
    const passwordToken = await PasswordToken.findOne({
      where: { userAccount: userId },
    });

    if (passwordToken && passwordToken.token !== token) {
      throw createError(
        400,
        'INVALID_PASSWORD_TOKEN',
        'password token is invalid',
      );
    }

    if (password !== confirmPassword) {
      throw createError(400, 'PASSWORD_NOT_MATCH', 'password does not match');
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserAccount.update(
      { id: userId },
      { password: hashedPassword },
    );

    return res.send({
      success: true,
      message: 'password has been reset',
      ...user,
    });
  } catch (error) {
    return next(createCatchError(error));
  }
};
