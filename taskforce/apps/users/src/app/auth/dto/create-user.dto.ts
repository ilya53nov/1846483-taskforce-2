import { City, UserRole } from '@taskforce/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEmail, IsISO8601, IsEnum, Length, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';
import { AuthUserDescription, UserValidation } from '../auth.constants';
import dayjs = require('dayjs');
import { UserApiProperty } from '../../app.constant';

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
  @ApiProperty(UserApiProperty.Username)
  @IsString()  
  @Length(UserValidation.NameLength.min, UserValidation.NameLength.max)
  username: string;

  @ApiProperty(UserApiProperty.Email)
  @IsEmail(
    {},
    {message: AuthUserDescription.EmailNotValid},
  )
  email: string;

  @ApiProperty(UserApiProperty.City)
  @IsEnum(City)
  city: City;

  @ApiProperty(UserApiProperty.Role)
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty(UserApiProperty.DateBirth)
  @IsISO8601({
    message: AuthUserDescription.BirthNotValid,
  })
  @Validate(AgeValidator, {message: AuthUserDescription.InvalidAge})
  dateBirth: Date;

  @ApiProperty(UserApiProperty.Password)
  @IsString()
  @Length(UserValidation.PasswordLength.min, UserValidation.PasswordLength.max)
  password: string;

  @ApiProperty(UserApiProperty.Avatar)
  avatar?: string;
}
