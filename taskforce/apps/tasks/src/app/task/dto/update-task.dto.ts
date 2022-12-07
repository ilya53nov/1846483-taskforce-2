import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Починить плиту'
  })
  header: string;

  @ApiProperty({
    description: 'Описание задания',
    example: 'Не включается плита'
  })
  description: string;

  @ApiProperty({
    description: 'Категория задания',
    example: 'Бытовая техника'
  })
  categoryTitle: string;

  @ApiProperty({
    description: 'Стоимость',
    example: '1000'
  })
  cost?: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '12.12.2022'
  })
  dateExecution?: Date;

  @ApiProperty({
    description: 'Изображение',
    example: 'плита.jpg'
  })
  image?: string;

  @ApiProperty({
    description: 'Адрес',
    example: 'Москва, ул. Бытовой плиты, д. 2'
  })
  address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию',
    example: 'плита, сломалась плита, работа за печеньки'
  })
  tags: string[];
}
