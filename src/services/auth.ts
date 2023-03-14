import createDebug from 'debug';
import { PayloadToken } from './token-info.js';
import jwt from 'jsonwebtoken';
import { config } from '../db/db-config.js';
import { HTTPError } from '../errors/errors.js';
import bcrypt from 'bcryptjs';

const debug = createDebug('MM:Auth');
debug('Loaded');

const salt = 10;

export class Auth {
  static createJWT(payload: PayloadToken) {
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWTPayload(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid token', `Invalid token: ${result}`);
    return result as PayloadToken;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
