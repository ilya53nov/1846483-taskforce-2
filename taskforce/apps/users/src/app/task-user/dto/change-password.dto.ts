import { ApiProperty } from '@nestjs/swagger';

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
  newPassword: string;
}
