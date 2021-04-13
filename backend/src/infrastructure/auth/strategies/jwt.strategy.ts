import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '@config';
import { IUserRepository } from '@domain/interfaces';
import { PERSISTENCE_USER_REPOSITORY } from '@constants';
import { User } from '@domain/models';

const UserRepository = () => Inject(PERSISTENCE_USER_REPOSITORY);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: AppConfigService,
    @UserRepository() private userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.appConfig.secret,
    });
  }

  async validate({ iat, exp, _id }): Promise<User> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findById(_id);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
