import { Module } from '@nestjs/common';
import { CategoryModule } from './admin/category';

@Module({
  imports: [CategoryModule],
  exports: [CategoryModule],
})
export class ApplicationModule {}
