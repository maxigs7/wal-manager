import { Module } from '@nestjs/common';
import { AuthModule, TokenFactory, UserManager } from './auth';

@Module({
  imports: [AuthModule],
  exports: [AuthModule],
})
export class InfrastructureModule {}
