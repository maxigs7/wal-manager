import { AppConfigService } from '@config';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly config: AppConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.appConfig.secret,
      signOptions: {
        expiresIn: this.config.appConfig.expiresIn,
      },
    };
  }
}
