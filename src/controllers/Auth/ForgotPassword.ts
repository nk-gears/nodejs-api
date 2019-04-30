import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid';
import * as Token from '~/queries/Token';
import * as TokenType from '~/queries/TokenType';
import * as UserAccount from '~/queries/UserAccount';
import { db } from '~/services/db';
import { sendResetPassword } from '~/services/mail';
import { handleCatchError, handleError } from '~/utils/error';
import { toSqlString } from '~/utils/sql';

export const ForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { email } = req.body;

  try {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [userFoundRows] = await conn.execute(UserAccount.findByEmail, [
        email,
      ]);
      const userFound = userFoundRows[0];

      if (!userFound) {
        throw handleError(
          404,
          'EMAIL_NOT_FOUND',
          'user with this email does not exists',
        );
      }

      const [tokenTypeRows] = await conn.execute(
        TokenType.findTokenTypeByType,
        ['reset_password'],
      );
      const tokenType = tokenTypeRows[0];

      const [tokenFoundRow] = await conn.execute(
        Token.findOneResetPasswordToken,
        [userFound.id],
      );
      const tokenFound = tokenFoundRow[0];

      const buf = await randomBytes(32);
      const token = buf.toString('hex');

      const tokenId = uuid.v1();
      const data = {
        token,
        expires_in: toSqlString('DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)'),
        token_type_id: tokenType.id,
        user_account_id: toSqlString(`UUID_TO_BIN('${userFound.id}', 1)`),
      };
      if (!tokenFound) {
        Object.assign(data, {
          id: toSqlString(`UUID_TO_BIN('${tokenId}', 1)`),
        });
      }

      await conn.execute(conn.format(Token.replaceToken, [data]));

      const [userAccountWithProfileRows] = await conn.execute(
        UserAccount.findOneWithProfile,
        [userFound.id],
      );
      const user = userAccountWithProfileRows[0];

      const mailResult = await sendResetPassword(user.name, user.email, token);

      await conn.commit();

      return res.send(mailResult);
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
