import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core';
import { AppConfigModule } from './config';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { apiRoutes } from './api/api.routes';
import { LoggerMiddleware } from './core/middlewares';
import { RouterModule } from 'nest-router';

@Module({
  imports: [
    RouterModule.forRoutes([...apiRoutes]),
    AppConfigModule,
    CoreModule,
    DatabaseModule,
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
