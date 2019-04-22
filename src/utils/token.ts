import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './error';

/**
 * Sign JWT Token
 * @param id user id
 * @returns signed token
 * @throws 500: ERR_SIGN_TOKEN
 */
export const signToken = (id: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign({ id }, process.env.JWT_SECRET_KEY);
      return resolve(token);
    } catch (error) {
      return reject(createError(500, 'ERR_SIGN_TOKEN', error.message));
    }
  });
};

/**
 * Verify JWT Token
 * @param token from extracting the authorization header
 * @returns decoded JWT or payload
 * @throws 400: INVALID_TOKEN
 */
export const verifyToken = (token: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      return resolve(decoded);
    } catch (error) {
      return reject(createError(400, 'INVALID_TOKEN', error.message));
    }
  });
};

/**
 * Extract JWT Token from bearer authorization header
 * @param req express request
 * @returns extracted token
 * @throws 500: ERR_EXTRACT_TOKEN
 */
export const extractToken = (req: Request): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return reject(
          createError(
            400,
            'ERR_AUTH_HEADER',
            'cannot get token on authorization header',
          ),
        );
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        return reject(
          createError(
            400,
            'ERR_SPLIT_AUTH_HEADER',
            'cannot split token on authorization header',
          ),
        );
      }

      return resolve(token);
    } catch (error) {
      return reject(createError(500, 'ERR_EXTRACT_TOKEN', error.message));
    }
  });
};
