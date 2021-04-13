import { ITokenFactory, ITokenPayloadDto } from '@application/auth/token';
import { AppConfigService } from '@config';
import { INFRASTRUCTURE_TOKEN_FACTORY } from '@constants';
import { User } from '@domain/models';
import { Injectable, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenFactory implements ITokenFactory {
  constructor(
    private jwtService: JwtService,
    private config: AppConfigService,
  ) {}

  async createToken(user: User): Promise<ITokenPayloadDto> {
    return {
      expiresIn: this.config.appConfig.expiresIn,
      accessToken: await this.jwtService.signAsync(user),
    };
  }
}

export const TokenFactoryProvider: Provider = {
  provide: INFRASTRUCTURE_TOKEN_FACTORY,
  useClass: TokenFactory,
};
