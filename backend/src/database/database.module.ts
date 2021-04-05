import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, AppConfigService } from '@config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.databaseConfig.url,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: configService.databaseConfig.user,
        pass: configService.databaseConfig.password,
        dbName: configService.databaseConfig.name,
        authSource: configService.databaseConfig.name,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseModule {}
