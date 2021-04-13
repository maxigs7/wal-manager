import { ApplicationModule } from '@application/application.module';
import { AppConfigModule } from '@config';
import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';

@Module({
  imports: [AppConfigModule, ApplicationModule],
  controllers: [GoogleController],
})
export class AuthModule {}
