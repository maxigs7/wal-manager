import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRepoProvider } from './category.repository';
import { CategorySchema, SchemaName } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SchemaName, schema: CategorySchema }]),
  ],
  providers: [CategoryRepoProvider],
  exports: [CategoryRepoProvider],
})
export class CategoryModule {}
