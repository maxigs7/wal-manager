import { Module } from '@nestjs/common';
import { PersistenceModule } from '@persistence/persistence.module';
import { CategoryService } from './service';

@Module({
  imports: [PersistenceModule],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
