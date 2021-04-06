import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [CategoriesController],
})
export class AdminModule {}
