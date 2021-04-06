import { Module } from '@nestjs/common';
import { CategoryModule } from './category';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
  exports: [CategoryModule],
})
export class PersistenceModule {}
