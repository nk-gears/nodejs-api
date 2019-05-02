import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { db } from '~/providers/db';
import * as SocialProvider from '~/queries/SocialProvider';
import * as UserAccount from '~/queries/UserAccount';
import { handleCatchError, handleError } from '~/utils/error';
import { signToken } from '~/utils/token';

export const SignInWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { idToken } = req.body;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userGoogle = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatar: payload.picture,
    };

    const [socialProviderFoundRows] = await db.execute(
      SocialProvider.findOneByAuthId,
      [userGoogle.id],
    );
    const socialProviderFound = socialProviderFoundRows[0];

    if (!socialProviderFound) {
      throw handleError(
        400,
        'PROVIDER_NOT_EXISTS',
        'login provider does not exists',
      );
    }

    const [userRows] = await db.execute(
      UserAccount.findOneWithProfileAndSocialProvider,
      [socialProviderFound.user_account_id],
    );
    const user = userRows[0];

    const token = await signToken(user.id);

    return res.send({ token, user });
  } catch (error) {
    return next(handleCatchError(error));
  }
};
