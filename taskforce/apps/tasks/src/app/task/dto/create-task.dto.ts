import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Индификатор пользователя',
    example: 'qwe1'
  })
  //@IsMongoId()
  userId: string;

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
  @Length(10, 255)
  address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию',
    example: 'плита, сломалась плита, работа за печеньки'
  })
  @IsOptional()
  tags: string[];
}
