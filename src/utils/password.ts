import { compare, genSalt, hash } from 'bcryptjs';
import { createError } from './error';

/**
 * Hash password
 * @param password
 * @returns hashed password
 * @throws 500: ERR_HASH_PASSWORD
 */
export const hashPassword = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await genSalt(10);
      const hashPass = await hash(password, salt);
      return resolve(hashPass);
    } catch (error) {
      return reject(createError(500, 'ERR_HASH_PASSWORD', error.message));
    }
  });
};

/**
 * Compare password
 * @param password
 * @param hashPass
 * @returns true or false
 * @throws 500: ERR_COMPARE_PASSWORD
 */
export const comparePassword = (
  password: string,
  hashPass: string,
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await compare(password, hashPass);
      return resolve(result);
    } catch (error) {
      return reject(createError(500, 'ERR_COMPARE_PASSWORD', error.message));
    }
  });
};
