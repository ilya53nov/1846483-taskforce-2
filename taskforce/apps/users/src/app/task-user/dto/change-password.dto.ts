import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserValidation } from '../../auth/auth.constants';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Текущий пароль пользователя',
    example: '123456'
  })
  currentPassword: string;

  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: '1234567'
  })
  @Length(UserValidation.PasswordLength.min, UserValidation.PasswordLength.max)
  newPassword: string;
}
