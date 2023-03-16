import { model, Schema } from 'mongoose';
import { EscapeRoom } from '../../entities/espaceroom';

const escapeRoomSchema = new Schema<EscapeRoom>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  players: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
});

escapeRoomSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._v;
    delete returnedObject._id;
  },
});

export const EscapeRoomModel = model(
  'Espaceroom',
  escapeRoomSchema,
  'escaperooms'
);
