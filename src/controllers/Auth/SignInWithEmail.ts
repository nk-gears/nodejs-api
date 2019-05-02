import { NextFunction, Request, Response } from 'express';
import { db } from '~/providers/db';
import * as UserAccount from '~/queries/UserAccount';
import { handleCatchError, handleError } from '~/utils/error';
import { comparePassword } from '~/utils/password';
import { signToken } from '~/utils/token';

export const SignInWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const [userFoundRows] = await db.execute(UserAccount.findByEmail, [email]);
    const userFound = userFoundRows[0];

    if (!userFound) {
      throw handleError(
        404,
        'USER_LOCAL_PROVIDER_NOT_FOUND',
        'user with local provider is not found',
      );
    }

    const passwordMatch = await comparePassword(password, userFound.password);

    if (!passwordMatch) {
      throw handleError(400, 'PASSWORD_NOT_MATCH', 'password does not match');
    }

    const [userRows] = await db.execute(
      UserAccount.findOneWithProfileAndSocialProvider,
      [userFound.id],
    );
    const user = userRows[0];
    delete user.password;

    const token = await signToken(user.id);

    return res.send({ token, user });
  } catch (error) {
    return next(handleCatchError(error));
  }
};
