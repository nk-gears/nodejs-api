import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import uuid from 'uuid';
import { db } from '~/providers/db';
import * as SocialProvider from '~/queries/SocialProvider';
import * as UserAccount from '~/queries/UserAccount';
import * as UserProfile from '~/queries/UserProfile';
import { handleCatchError, handleError } from '~/utils/error';
import { toSqlString } from '~/utils/sql';
import { signToken } from '~/utils/token';

export const SignUpWithGoogle = async (
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

    const [userFoundRows] = await db.execute(UserAccount.findByEmail, [
      userGoogle.email,
    ]);
    const userFound = userFoundRows[0];

    if (userFound) {
      throw handleError(400, 'USER_EXISTS', 'user already exists');
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const buf = await randomBytes(10);
      const randomUsername = buf.toString('hex').substr(0, 20);

      const userAccountId = uuid.v1();
      await conn.execute(
        conn.format(UserAccount.insertOne, [
          {
            id: toSqlString(`UUID_TO_BIN('${userAccountId}', 1)`),
            username: randomUsername,
            email: userGoogle.email,
          },
        ]),
      );

      const userProfileId = uuid.v1();
      await conn.execute(
        conn.format(UserProfile.insertOne, [
          {
            id: toSqlString(`UUID_TO_BIN('${userProfileId}', 1)`),
            name: userGoogle.name,
            avatar: userGoogle.avatar,
            user_account_id: toSqlString(`UUID_TO_BIN('${userAccountId}', 1)`),
          },
        ]),
      );

      const socialProviderId = uuid.v1();
      await conn.execute(
        conn.format(SocialProvider.insertOne, [
          {
            id: toSqlString(`UUID_TO_BIN('${socialProviderId}', 1)`),
            type: 'google',
            auth_id: userGoogle.id,
            user_account_id: toSqlString(`UUID_TO_BIN('${userAccountId}', 1)`),
          },
        ]),
      );

      const [userRows] = await conn.execute(
        UserAccount.findOneWithProfileAndSocialProvider,
        [userAccountId],
      );
      const user = userRows[0];

      const token = await signToken(user.id);

      await conn.commit();

      return res.send({ token, user });
    } catch (error) {
      await conn.rollback();
      throw handleCatchError(error);
    } finally {
      await conn.release();
    }
  } catch (error) {
    return next(handleCatchError(error));
  }
};
