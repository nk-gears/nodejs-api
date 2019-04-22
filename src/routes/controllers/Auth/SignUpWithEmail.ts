import { NextFunction, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { UserAccount } from '~/database/entities/UserAccount';
import { createCatchError, createError } from '~/utils/error';
import { hashPassword } from '~/utils/password';
import { signToken } from '~/utils/token';

export const SignUpWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { name, email, password } = req.body;

  try {
    return await getConnection().transaction(async manager => {
      const userFound = await manager.findOne(UserAccount, {
        where: { email },
      });

      if (userFound) {
        throw createError(400, 'USER_EXISTS', 'user already exists');
      }

      const hashedPassword = await hashPassword(password);

      const userInsert = await manager.insert(UserAccount, {
        email,
        name,
        password: hashedPassword,
        provider: 'local',
      });

      const user = await manager.findOneOrFail(UserAccount, {
        where: { id: userInsert.identifiers[0].id },
      });
      delete user.password;

      const token = await signToken(user.id);

      return res.send({ token, user });
    });
  } catch (error) {
    return next(createCatchError(error));
  }
};
