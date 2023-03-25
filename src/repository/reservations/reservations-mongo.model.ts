import { model, Schema } from 'mongoose';
import { Reservation } from '../../entities/reservation';

const reservationSchema = new Schema<Reservation>({
  reserveDate: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  escaperoom: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Espaceroom',
    },
  ],
});

reservationSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._v;
    delete returnedObject._id;
  },
});

export const ReservationModel = model(
  'Reservation',
  reservationSchema,
  'reservations'
);
