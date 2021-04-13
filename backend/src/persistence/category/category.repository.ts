import { PERSISTENCE_CATEGORY_REPOSITORY } from '@constants';
import { PersistenceException } from '@core/exceptions/persistence.exception';
import { ICategoryRepository } from '@domain/interfaces';
import { Category } from '@domain/models';
import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument, SchemaName } from './category.schema';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(SchemaName) private readonly model: Model<CategoryDocument>,
  ) {}

  public async create(doc: Category): Promise<string> {
    try {
      const newDoc = await this.model.create(doc);
      return newDoc._id;
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }

  public async update(id: string, doc: Partial<Category>): Promise<Category> {
    try {
      const updatedDoc = await this.model.findOneAndUpdate(
        {
          _id: id,
        },
        doc,
      );
      return updatedDoc;
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }

  public async findAll(
    conditions?: Partial<Record<keyof Category, unknown>>,
  ): Promise<Category[]> {
    try {
      return await this.model.find(conditions);
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }
}

export const CategoryRepoProvider: Provider = {
  provide: PERSISTENCE_CATEGORY_REPOSITORY,
  useClass: CategoryRepository,
};
