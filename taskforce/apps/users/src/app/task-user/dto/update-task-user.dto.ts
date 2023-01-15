import { ApiProperty } from '@nestjs/swagger';
import { City } from '@taskforce/shared-types';
import { IsString, Length } from 'class-validator';
import { UserValidation } from '../../auth/auth.constants';

export class UpdateTaskUserDto {
  @ApiProperty({
    description: 'Имя и фамилия пользователя',
    example: 'Иван Иванов'
  })
  @IsString()  
  @Length(UserValidation.NameLength.min, UserValidation.NameLength.max)
  username: string;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1995-05-11'
  })
  dateBirth: Date;

  @ApiProperty({
    description: 'Информация о себе',
    example: 'Я начинающий специалист'
  })  
  info: string;

  @ApiProperty({
    description: 'Список навыков пользователя',
    example: 'JS, TS'
  })
  specialization: string;

  @ApiProperty({
    description: 'Город из списка',
    enum: City,
    example: 'Москва'
  })  
  city: City;
}
