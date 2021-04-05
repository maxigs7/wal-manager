import { AppConfigModule } from '@config';
import { Global, Module } from '@nestjs/common';
import * as providers from './providers';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class CoreModule {}
