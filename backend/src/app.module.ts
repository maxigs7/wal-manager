import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core';
import { AppConfigModule } from './config';
import { ApiModule } from './api/api.module';
import { apiRoutes } from './api/api.routes';
import { ApplicationModule } from './application/application.module';
import { LoggerMiddleware } from './core/middlewares';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    RouterModule.forRoutes([...apiRoutes]),
    AppConfigModule,
    CoreModule,
    PersistenceModule,
    ApplicationModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
