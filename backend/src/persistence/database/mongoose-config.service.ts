import { AppConfigService } from '@config';
import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly config: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.databaseConfig.url,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      user: this.config.databaseConfig.user,
      pass: this.config.databaseConfig.password,
      dbName: this.config.databaseConfig.name,
      authSource: this.config.databaseConfig.name,
    };
  }
}
