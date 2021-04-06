import { Category, ICategoryRepository } from '@domain/category';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryDocument } from './schema';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel('Category') private readonly model: Model<CategoryDocument>,
  ) {}

  async create(entity: Category): Promise<string> {
    return (await this.model.create(entity)).id;
  }

  async find(): Promise<Category[]> {
    return this.model.find().exec();
  }
}
