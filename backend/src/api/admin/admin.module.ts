import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [],
  controllers: [CategoriesController],
})
export class AdminModule {}
