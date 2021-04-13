import { AppConfigModule } from '@config';
import { CoreModule } from '@core';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PersistenceModule } from '@persistence/persistence.module';
import { RouterModule } from 'nest-router';
import { ApiModule } from './api/api.module';
import { apiRoutes } from './api/api.routes';
import { ApplicationModule } from './application/application.module';
import { LoggerMiddleware } from './core/middlewares';

@Module({
  imports: [
    RouterModule.forRoutes([...apiRoutes]),
    AppConfigModule,
    CoreModule,
    ApplicationModule,
    PersistenceModule,
    InfrastructureModule,
    ApiModule,
  ],
})
export class AppModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
