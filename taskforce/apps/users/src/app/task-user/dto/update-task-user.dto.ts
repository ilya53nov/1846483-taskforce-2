import { ApiProperty } from '@nestjs/swagger';
import { City } from '@taskforce/shared-types';

export class UpdateTaskUserDto {
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
