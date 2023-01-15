import { City, UserRole } from '@taskforce/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEmail, IsISO8601, IsEnum, Length, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';
import { AuthUserDescription, UserValidation } from '../auth.constants';
import dayjs = require('dayjs');

const AGE_VALIDATOR = 'ageValidator';

@ValidatorConstraint({ name: AGE_VALIDATOR })
export class AgeValidator implements ValidatorConstraintInterface {
  validate(birthDate: Date): boolean {
    const currentDate = dayjs(new Date);
    const diffYear = currentDate.diff(dayjs(birthDate), 'years');

    if (diffYear < UserValidation.Age.min) {
      return false;
    }

    return true;
  }
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя и фамилия пользователя',
    example: 'Иван Иванов'
  })
  @IsString()  
  @Length(UserValidation.NameLength.min, UserValidation.NameLength.max)
  username: string;

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
  @Validate(AgeValidator, {message: AuthUserDescription.InvalidAge})
  dateBirth: Date;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  })
  @IsString()
  @Length(UserValidation.PasswordLength.min, UserValidation.PasswordLength.max)
  password: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'smile.jpg'
  })

  avatar?: string;
}
