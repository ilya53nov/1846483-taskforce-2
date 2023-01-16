import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserApiProperty } from '../../app.constant';
import { UserValidation } from '../../auth/auth.constants';

export class ChangePasswordDto {
  @ApiProperty(UserApiProperty.Password)
  currentPassword: string;

  @ApiProperty(UserApiProperty.NewPassword)
  @Length(UserValidation.PasswordLength.min, UserValidation.PasswordLength.max)
  newPassword: string;
}
