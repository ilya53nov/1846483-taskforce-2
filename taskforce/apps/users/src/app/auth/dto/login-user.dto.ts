import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@user.ru'
  }) 
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  }) 
  public password: string;
}
