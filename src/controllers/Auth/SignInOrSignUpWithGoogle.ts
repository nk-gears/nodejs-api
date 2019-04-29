// import { NextFunction, Request, Response } from 'express';
// import { OAuth2Client } from 'google-auth-library';
// import { getConnection } from 'typeorm';
// import { UserAccount } from '~/database/entities/UserAccount';
// import { createCatchError, createError } from '~/utils/error';
// import { signToken } from '~/utils/token';

// export const SignInOrSignUpWithGoogle = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   const { idToken } = req.body;

//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const userGoogle = {
//       id: payload.sub,
//       name: payload.name,
//       email: payload.email,
//       avatar: payload.picture,
//     };

//     const user = await UserAccount.findOne({
//       where: { email: userGoogle.email },
//     });

//     if (user && user.providerId !== userGoogle.id) {
//       throw createError(
//         400,
//         'USER_EXISTS',
//         'user with this email already exists',
//       );
//     }

//     if (user && user.providerId === userGoogle.id) {
//       // signin
//       const token = await signToken(user.id);
//       return res.send({ token, user });
//     }

//     // signup
//     return await getConnection().transaction(async manager => {
//       const userCreate = await manager.insert(UserAccount, {
//         provider: 'google',
//         providerId: userGoogle.id,
//         name: userGoogle.name,
//         email: userGoogle.email,
//         avatar: userGoogle.avatar,
//       });

//       const userAfterCreated = await manager.findOne(UserAccount, {
//         where: { id: userCreate.identifiers[0].id },
//       });
//       delete userAfterCreated.password;

//       const token = await signToken(userAfterCreated.id);

//       return res.send({ token, user: userAfterCreated });
//     });
//   } catch (error) {
//     return next(createCatchError(error));
//   }
// };
