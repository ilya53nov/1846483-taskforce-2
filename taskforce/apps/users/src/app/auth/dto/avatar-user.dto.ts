import { Matches } from 'class-validator';
import { AuthUserDescription, UserValidation } from '../auth.constants';

export class AvatarUserDto {
  @Matches(UserValidation.Avatar.fileType, { message: AuthUserDescription.InvalidTypeAvatar })
  public avatar: string;
}
