import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min, Validate } from 'class-validator';
import { INVALID_TAG, TaskValidation } from '../task.constant';
import { TagsValidator } from './validator.dto';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Индификатор пользователя',
    example: 'qwe1'
  })
  userId: string;

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
  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '12.12.2022'
  })
  @IsOptional()
  dateExecutionAt?: Date;

  @ApiProperty({
    description: 'Изображение',
    example: 'плита.jpg'
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Адрес',
    example: 'Москва, ул. Бытовой плиты, д. 2'
  })
  @IsOptional()
  @IsString()
  @Length(TaskValidation.AddressLength.min, TaskValidation.AddressLength.max)
  address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию',
    example: 'плита, сломалась плита, работа за печеньки'
  })
  @IsOptional()
  @Validate(TagsValidator, { message: INVALID_TAG})
  tags: string[];
}
