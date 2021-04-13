import { User, LoginProvider } from '@domain/models';
import { entitySchemaOptions } from '@persistence/shared';
import { Document, Schema } from 'mongoose';

export type UserDocument = User & Document;

export const SchemaName = 'User';

export const UserSchema: Schema = new Schema({
  ...entitySchemaOptions,
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  imageUrl: String,
  provider: {
    type: String,
    enum: LoginProvider,
    default: LoginProvider.Google,
  },
});
