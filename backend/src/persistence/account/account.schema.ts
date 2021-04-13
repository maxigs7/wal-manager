import { Account, AccountType } from '@domain/models';
import { Document, Schema } from 'mongoose';

export type AccountDocument = Account & Document;

export const AccountSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  accountType: {
    type: String,
    required: true,
    enum: AccountType,
    default: AccountType.Wallet,
  },
  archivedDate: { type: Date },
  userId: { type: String, required: true },
});
