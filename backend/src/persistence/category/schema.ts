import { Category } from '@domain/category';
import { Document, Schema } from 'mongoose';

export type CategoryDocument = Category & Document;

export const CategorySchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  // subcategories: [this],
  isActive: { type: Boolean, required: true, default: true },
});
