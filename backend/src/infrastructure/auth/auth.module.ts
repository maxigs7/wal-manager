import { AppConfigModule, AppConfigService } from '@config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PersistenceModule } from '@persistence/persistence.module';
import { JwtAuthGuard } from './guards';
import { JwtConfigService } from './jwt-config.service';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { TokenFactoryProvider } from './token-factory.service';
import { UserManagerProvider } from './user-manager.service';

@Module({
  imports: [
    AppConfigModule,
    PersistenceModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    TokenFactoryProvider,
    UserManagerProvider,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
