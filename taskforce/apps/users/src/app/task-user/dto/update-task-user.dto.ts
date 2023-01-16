import { ApiProperty } from '@nestjs/swagger';
import { City } from '@taskforce/shared-types';
import { IsString, Length } from 'class-validator';
import { UserApiProperty } from '../../app.constant';
import { UserValidation } from '../../auth/auth.constants';

export class UpdateTaskUserDto {
  @ApiProperty(UserApiProperty.Username)
  @IsString()  
  @Length(UserValidation.NameLength.min, UserValidation.NameLength.max)
  username: string;

  @ApiProperty(UserApiProperty.DateBirth)
  dateBirth: Date;

  @ApiProperty(UserApiProperty.Info)  
  info: string;

  @ApiProperty(UserApiProperty.Specialization)
  specialization: string;

  @ApiProperty(UserApiProperty.City)  
  city: City;
}
