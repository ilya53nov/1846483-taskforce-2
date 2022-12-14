import { City, UserRole } from '@taskforce/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEmail, IsISO8601, IsEnum, Length } from 'class-validator';
import { AuthUserDescription } from '../auth.constants';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван'
  })
  @IsString()  
  @Length(3,50)
  firstname: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов'
  })
  @IsString()  
  lastname: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@user.ru'
  })
  @IsEmail(
    {},
    {message: AuthUserDescription.EmailNotValid},
  )
  email: string;

  @ApiProperty({
    description: 'Город из списка',
    enum: City,
    example: 'Москва'
  })
  @IsEnum(City)
  city: City;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
    example: 'Исполнитель'
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1995-05-11'
  })
  @IsISO8601({
    message: AuthUserDescription.BirthNotValid,
  })
  dateBirth: Date;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  })
  @IsString()
  @Length(6,12)
  password: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'smile.jpg'
  })
  avatar?: string;
}
