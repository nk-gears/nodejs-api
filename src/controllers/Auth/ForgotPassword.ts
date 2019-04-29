// import { randomBytes } from 'crypto';
// import dateFns from 'date-fns';
// import { NextFunction, Request, Response } from 'express';
// import { getConnection } from 'typeorm';
// import { sendResetPassword } from '~/services/mail';
// import { handleCatchError, handleError } from '~/utils/error';

// export const ForgotPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   const { email } = req.body;

//   try {
//     return await getConnection().transaction(async manager => {
//       const userFound = await manager.findOne(UserAccount, {
//         where: { email },
//       });

//       if (!userFound) {
//         throw createError(
//           404,
//           'EMAIL_NOT_FOUND',
//           'user with this email does not exists',
//         );
//       }

//       const passwordToken = await manager.findOne(PasswordToken, {
//         where: { userAccount: userFound.id },
//       });

//       const buf = await randomBytes(32);
//       const token = buf.toString('hex');
//       const expiresIn = dateFns.addMinutes(new Date(), 60);

//       if (passwordToken && passwordToken.token) {
//         await manager.update(
//           PasswordToken,
//           { id: passwordToken.id },
//           { token, expiresIn },
//         );
//       } else {
//         await manager.insert(PasswordToken, {
//           token,
//           userAccount: userFound,
//           expiresIn,
//         });
//       }

//       const passwordTokenWithUser = await manager.findOne(PasswordToken, {
//         where: { userAccount: userFound.id },
//         relations: ['userAccount'],
//       });

//       delete passwordTokenWithUser.userAccount.password;

//       const user = passwordTokenWithUser.userAccount;

//       const mailResult = await sendResetPassword(
//         user.name,
//         user.email,
//         passwordTokenWithUser.token,
//       );

//       return res.send(mailResult);
//     });
//   } catch (error) {
//     return next(createCatchError(error));
//   }
// };
