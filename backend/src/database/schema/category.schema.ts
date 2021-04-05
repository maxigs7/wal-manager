import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  categoryId?: ObjectId;

  @Prop({ required: true })
  isDeleted = false;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
