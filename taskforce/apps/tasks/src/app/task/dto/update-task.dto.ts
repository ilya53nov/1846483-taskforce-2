import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Починить плиту'
  })
  @IsString()
  @Length(20, 50)
  header: string;

  @ApiProperty({
    description: 'Описание задания',
    example: 'Не включается плита'
  })
  @IsString()
  @Length(100, 1024)
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
  @Length(10, 255)
  address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию',
    example: 'плита, сломалась плита, работа за печеньки'
  })
  tags: string[];
}
