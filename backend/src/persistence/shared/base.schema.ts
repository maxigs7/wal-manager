import { Schema } from 'mongoose';

export const entitySchemaOptions = {
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
};
