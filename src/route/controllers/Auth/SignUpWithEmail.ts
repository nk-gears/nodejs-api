// import { NextFunction, Request, Response } from 'express';
// import { getConnection } from 'typeorm';
// import { createCatchError, createError } from '~/utils/error';
// import { hashPassword } from '~/utils/password';
// import { signToken } from '~/utils/token';
// import { UserAuth } from '~/database/entities/UserAuth';
// import { UserAccount } from '~/database/entities/UserAccount';
// import { UserProfile } from '~/database/entities/UserProfile';

// export const SignUpWithEmail = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   const { name, username, email, password } = req.body;

//   try {
//     return await getConnection().transaction(async manager => {
//       const userFound = await manager.findOne(UserAuth, {
//         where: { email },
//       });

//       if (userFound) {
//         throw createError(400, 'USER_EXISTS', 'user already exists');
//       }

//       const hashedPassword = await hashPassword(password);

//       const userProfileInsert = await manager.insert(UserProfile, {
//         name,
//       });
//       const userAccountInsert = await manager.insert(UserAccount, {
//         username,
//         userProfile: userProfileInsert.identifiers[0].id,
//       });
//       await manager.insert(UserAuth, {
//         email,
//         password: hashedPassword,
//         provider: 'local',
//         userAccount: userAccountInsert.identifiers[0].id,
//       });

//       const user = await manager.findOneOrFail(UserAccount, {
//         where: { id: userAccountInsert.identifiers[0].id },
//         relations: ['userAuth', 'userProfile'],
//       });

//       // delete user.password;
//       return res.send({ user });

//       // const token = await signToken(user.id);

//       // return res.send({ token, user });
//     });
//   } catch (error) {
//     return next(createCatchError(error));
//   }
// };
