import { City, UserRole } from '@taskforce/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван'
  })  
  firstname: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов'
  })
  lastname: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@user.ru'
  })
  email: string;

  @ApiProperty({
    description: 'Город из списка',
    enum: City,
    example: 'Москва'
  })
  city: City;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
    example: 'Исполнитель'
  })
  role: UserRole;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1995-05-11'
  })
  dateBirth: Date;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  })
  password: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'smile.jpg'
  })
  avatar?: string;
}
