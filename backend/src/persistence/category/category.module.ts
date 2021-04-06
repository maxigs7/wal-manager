import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRepoProvider } from './provider';
import { CategorySchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [CategoryRepoProvider],
  exports: [CategoryRepoProvider],
})
export class CategoryModule {}
