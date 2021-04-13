import { GoogleUser, IUserManager } from '@application/auth/user';
import {
  INFRASTRUCTURE_USER_MANAGER,
  PERSISTENCE_USER_REPOSITORY,
} from '@constants';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { Inject, Injectable, Provider } from '@nestjs/common';

const UserRepository = () => Inject(PERSISTENCE_USER_REPOSITORY);

@Injectable()
export class UserManager implements IUserManager {
  constructor(@UserRepository() private userRepository: IUserRepository) {}

  async googleLogin(googleUser: GoogleUser): Promise<User> {
    const user = await this.userRepository.findByEmail(googleUser.username);
    if (user) return user;

    const userId = await this.userRepository.create({
      ...(googleUser as User),
    });
    return {
      ...googleUser,
      _id: userId,
    };
  }
}

export const UserManagerProvider: Provider = {
  provide: INFRASTRUCTURE_USER_MANAGER,
  useClass: UserManager,
};
