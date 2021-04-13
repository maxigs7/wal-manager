import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepoProvider } from './user.repository';
import { UserSchema, SchemaName } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SchemaName, schema: UserSchema }]),
  ],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider],
})
export class UserModule {}
