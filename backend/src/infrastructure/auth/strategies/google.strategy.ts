import { ITokenFactory } from '@application/auth/token';
import { IUserManager } from '@application/auth/user';
import { UserAuthDto } from '@application/auth/user/user-auth';
import { AppConfigService } from '@config';
import {
  INFRASTRUCTURE_TOKEN_FACTORY,
  INFRASTRUCTURE_USER_MANAGER,
} from '@constants';
import { LoginProvider } from '@domain/models';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { GoogleProfile } from '../interfaces/google.profile';

const UserManager = () => Inject(INFRASTRUCTURE_USER_MANAGER);
const TokenFactory = () => Inject(INFRASTRUCTURE_TOKEN_FACTORY);

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: AppConfigService,
    @UserManager() private userManager: IUserManager,
    @TokenFactory() private tokenFactory: ITokenFactory,
  ) {
    super({
      clientID: config.authGoogleConfig.clientId,
      clientSecret: config.authGoogleConfig.clientSecret,
      callbackURL: config.authGoogleConfig.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ): Promise<UserAuthDto> {
    const googleUser = {
      username: profile.emails[0].value,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      imageUrl: profile.photos[0].value,
      provider: LoginProvider.Google,
    };

    const user = await this.userManager.googleLogin(googleUser);
    const tokenData = await this.tokenFactory.createToken(user);
    return {
      ...user,
      ...tokenData,
    };
  }
}
