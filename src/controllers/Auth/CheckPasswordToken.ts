// import { NextFunction, Request, Response } from 'express';
// import { PasswordToken } from '~/database/entities/PasswordToken';
// import { createCatchError, createError } from '~/utils/error';

// export const CheckPasswordToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   const { token } = req.body;

//   try {
//     const passwordToken = await PasswordToken.findOne({
//       where: { token },
//       relations: ['userAccount'],
//     });

//     if (!passwordToken) {
//       throw createError(
//         400,
//         'INVALID_PASSWORD_TOKEN',
//         'password token is invalid',
//       );
//     }

//     const dateNow = new Date();

//     if (passwordToken && dateNow > passwordToken.expiresIn) {
//       throw createError(
//         400,
//         'PASSWORD_TOKEN_EXPIRED',
//         'password token is expired',
//       );
//     }

//     return res.send({
//       valid: true,
//       token,
//       userId: passwordToken.userAccount.id,
//     });
//   } catch (error) {
//     return next(createCatchError(error));
//   }
// };
