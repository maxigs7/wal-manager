import { User } from '@domain/models';
import { ITokenPayloadDto } from './token-payload';

export interface ITokenFactory {
  createToken(user: User): Promise<ITokenPayloadDto>;
}
