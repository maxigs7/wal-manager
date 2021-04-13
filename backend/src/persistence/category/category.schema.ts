import { Category, TransactionType } from '@domain/models';
import { entitySchemaOptions } from '@persistence/shared';
import { Document, Schema } from 'mongoose';

export type CategoryDocument = Category & Document;

const baseSchemaOptions = {
  ...entitySchemaOptions,
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
};

export const SchemaName = 'Category';

export const CategorySchema: Schema = new Schema({
  ...baseSchemaOptions,
  color: { type: String, required: true },
  icon: { type: String, required: true },
  transactionType: {
    type: String,
    required: true,
    enum: TransactionType,
  },
  subCategories: [
    {
      ...baseSchemaOptions,
    },
  ],
  userId: { type: String, required: true },
});
