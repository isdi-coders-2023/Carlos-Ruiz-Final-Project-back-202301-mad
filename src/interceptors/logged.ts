import { NextFunction, Response } from 'express';
import createDebug from 'debug';
import { RequestToken } from './extra-request.js';
import { HTTPError } from '../errors/errors.js';
import { Auth } from '../services/auth.js';

const debug = createDebug('MM:interceptors');

export function logged(
  req: RequestToken,
  _resp: Response,
  next: NextFunction
): void {
  try {
    debug('Logged interceptor');

    const authHeaderInfo = req.get('Authorization');

    if (!authHeaderInfo)
      throw new HTTPError(498, 'Invalid Token', 'No token info in the header');

    if (!authHeaderInfo.startsWith('Bearer'))
      throw new HTTPError(
        498,
        'Invalid token',
        'No bearer in the authorization'
      );

    const token = authHeaderInfo.slice(7);
    const payloadToken = Auth.verifyJWTPayload(token);
    req.tokenInfo = payloadToken;
    next();
  } catch (error) {
    next(error);
  }
}
