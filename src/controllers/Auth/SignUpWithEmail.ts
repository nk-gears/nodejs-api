import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid';
import { db } from '~/providers/db';
import * as UserAccount from '~/queries/UserAccount';
import * as UserProfile from '~/queries/UserProfile';
import { handleCatchError, handleError } from '~/utils/error';
import { hashPassword } from '~/utils/password';
import { toSqlString } from '~/utils/sql';
import { signToken } from '~/utils/token';

export const SignUpWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { name, username, email, password } = req.body;

  try {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [userAccountRows] = await conn.execute(UserAccount.findByEmail, [
        email,
      ]);
      const userAccount = userAccountRows[0];

      if (userAccount) {
        throw handleError(400, 'USER_EXISTS', 'user is already exists');
      }

      const userAccountId = uuid.v1();
      const hashedPassword = await hashPassword(password);
      await conn.execute(
        conn.format(UserAccount.insertOne, [
          {
            id: toSqlString(`UUID_TO_BIN('${userAccountId}', 1)`),
            username,
            email,
            password: hashedPassword,
          },
        ]),
      );

      const userProfileId = uuid.v1();
      await conn.execute(
        conn.format(UserProfile.insertOne, [
          {
            id: toSqlString(`UUID_TO_BIN('${userProfileId}', 1)`),
            name,
            user_account_id: toSqlString(`UUID_TO_BIN('${userAccountId}', 1)`),
          },
        ]),
      );

      const [userRows] = await conn.execute(
        UserAccount.findOneWithProfileAndSocialProvider,
        [userAccountId],
      );
      const user = userRows[0];
      delete user.password;

      await conn.commit();

      const token = await signToken(user.id);

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
