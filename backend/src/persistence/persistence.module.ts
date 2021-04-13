import { Module } from '@nestjs/common';
import { CategoryModule } from './category';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user';

@Module({
  imports: [DatabaseModule, CategoryModule, UserModule],
  exports: [CategoryModule, UserModule],
})
export class PersistenceModule {}
