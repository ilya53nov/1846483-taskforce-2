import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min, Validate } from 'class-validator';
import { INVALID_TAG, TaskValidation } from '../task.constant';
import { TagsValidator } from './validator.dto';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Починить плиту'
  })
  @IsString()
  @Length(TaskValidation.HeaderLength.min, TaskValidation.HeaderLength.max)
  header: string;

  @ApiProperty({
    description: 'Описание задания',
    example: 'Не включается плита'
  })
  @IsString()
  @Length(TaskValidation.DescriptionLength.min, TaskValidation.DescriptionLength.max)
  description: string;

  @ApiProperty({
    description: 'Категория задания',
    example: 'Бытовая техника'
  })
  @IsString()
  categoryTitle: string;

  @ApiProperty({
    description: 'Стоимость',
    example: '1000'
  })
  @IsNumber()
  @Min(0)
  cost?: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '12.12.2022'
  })
  dateExecutionAt?: Date;

  @ApiProperty({
    description: 'Изображение',
    example: 'плита.jpg'
  })
  image?: string;

  @ApiProperty({
    description: 'Адрес',
    example: 'Москва, ул. Бытовой плиты, д. 2'
  })
  @IsString()
  @Length(TaskValidation.AddressLength.min, TaskValidation.AddressLength.max)
  address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию',
    example: 'плита, сломалась плита, работа за печеньки'
  })
  @Validate(TagsValidator, { message: INVALID_TAG})
  tags: string[];
}
