import { EscapeRoom } from './espaceroom';
import { User } from './user';

export type Reservation = {
  id: string;
  reserveDate: string;
  user: User;
  escaperoom: EscapeRoom;
};
