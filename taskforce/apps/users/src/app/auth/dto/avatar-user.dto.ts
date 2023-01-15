import { Matches } from 'class-validator';
import { UserValidation } from '../auth.constants';

export class AvatarUserDto {
  @Matches(UserValidation.Avatar.fileType, { message: 'Avatar must be jpg, png' })
  public avatar: string;
}
