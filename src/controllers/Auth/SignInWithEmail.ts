import { NextFunction, Request, Response } from 'express';
import { handleCatchError, handleError } from '~/utils/error';
import { comparePassword } from '~/utils/password';
import { signToken } from '~/utils/token';
import { db } from '~/services/db';
import * as UserAccount from '~/queries/UserAccount';

export const SignInWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const [usersFound] = await db.execute(UserAccount.findByEmail, [email]);
    const userFound = usersFound[0];

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

    const [users] = await db.execute(
      UserAccount.findOneWithProfileAndSocialProvider,
      [userFound.id],
    );
    const user = users[0];

    const token = await signToken(user.id);

    return res.send({ token, user });
  } catch (error) {
    return next(handleCatchError(error));
  }
};
