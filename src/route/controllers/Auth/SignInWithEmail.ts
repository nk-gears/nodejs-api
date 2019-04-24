// import { NextFunction, Request, Response } from 'express';
// import { UserAccount } from '~/database/entities/UserAccount';
// import { createCatchError, createError } from '~/utils/error';
// import { comparePassword } from '~/utils/password';
// import { signToken } from '~/utils/token';
// import { UserAuth } from '~/database/entities/UserAuth';

// export const SignInWithEmail = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserAuth.findOne({
//       where: { email, provider: 'local' },
//     });
//     console.log(user);

//     if (!user) {
//       throw createError(404, 'USER_NOT_FOUND', 'user not found');
//     }

//     // const passwordMatch = await comparePassword(password, user.password);

//     // if (!passwordMatch) {
//     //   throw createError(400, 'PASSWORD_NOT_MATCH', 'password does not match');
//     // }

//     // delete user.password;

//     // const token = await signToken(user.id);

//     // return res.send({ token, user });
//   } catch (error) {
//     return next(createCatchError(error));
//   }
// };
