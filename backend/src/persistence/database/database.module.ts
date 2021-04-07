import { AppConfigModule } from '@config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
})
export class DatabaseModule {}
