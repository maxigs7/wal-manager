import { LoginProvider, User } from '@domain/models';
import { ApiProperty } from '@nestjs/swagger';
import { ITokenPayloadDto } from '../token';

export class UserAuthDto implements ITokenPayloadDto, User {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty({ enum: LoginProvider })
  provider?: LoginProvider;
  @ApiProperty()
  expiresIn: string | number;
  @ApiProperty()
  accessToken: string;
}
