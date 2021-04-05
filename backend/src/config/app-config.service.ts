import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './app';
import { IDatabaseConfig } from './database';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get<T = any>(key: string): T {
    return this.config.get<T>(key);
  }

  get appConfig(): IAppConfig {
    return this.config.get<IAppConfig>('app');
  }

  get databaseConfig(): IDatabaseConfig {
    return this.config.get<IDatabaseConfig>('database');
  }

  get isDevelopment(): boolean {
    return this.appConfig.env === 'development';
  }

  get isTest(): boolean {
    return this.appConfig.env === 'test';
  }

  get isProduction(): boolean {
    return this.appConfig.env === 'production';
  }

  get isSwaggerEnabled(): boolean {
    return !this.isProduction;
  }
}
