import { PERSISTENCE_USER_REPOSITORY } from '@constants';
import { PersistenceException } from '@core/exceptions/persistence.exception';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, SchemaName } from './user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(SchemaName) private readonly model: Model<UserDocument>,
  ) {}

  public async create(doc: User): Promise<string> {
    try {
      const newDoc = await this.model.create(doc);
      return newDoc._id;
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }

  public async update(id: string, doc: Partial<User>): Promise<User> {
    try {
      const updatedDoc = await this.model.findOneAndUpdate(
        {
          _id: id,
        },
        doc,
      );
      return updatedDoc.toObject<User>();
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.model.findOne({ email: email });
      return user.toObject<User>();
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }

  public async findById(id: string): Promise<User> {
    try {
      const user = await this.model.findOne({ _id: id });
      return user.toObject<User>();
    } catch (err) {
      throw new PersistenceException(err.message);
    }
  }
}

export const UserRepoProvider: Provider = {
  provide: PERSISTENCE_USER_REPOSITORY,
  useClass: UserRepository,
};
