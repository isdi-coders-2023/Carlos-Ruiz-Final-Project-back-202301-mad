import { Request } from 'express';
import { PayloadToken } from '../services/auth';

export interface RequestToken extends Request {
  tokenInfo: PayloadToken;
}
