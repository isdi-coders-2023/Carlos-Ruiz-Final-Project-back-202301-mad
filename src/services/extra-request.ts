import { PayloadToken } from './token-info';
import { Request } from 'express';

export interface ExtraRequest extends Request {
  tokenInfo: PayloadToken;
}
