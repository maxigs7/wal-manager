import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './app';
import { IGoogleConfig } from './auth';
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

  get authGoogleConfig(): IGoogleConfig {
    return this.config.get<IGoogleConfig>('auth.google');
  }

  get databaseConfig(): IDatabaseConfig {
    return this.config.get<IDatabaseConfig>('database');
  }

  get isDevelopment(): boolean {
    return this.appConfig.env === 'development';
  }

  get isProduction(): boolean {
    return this.appConfig.env === 'production';
  }

  get isSwaggerEnabled(): boolean {
    return !this.isProduction;
  }

  get isTest(): boolean {
    return this.appConfig.env === 'test';
  }
}
