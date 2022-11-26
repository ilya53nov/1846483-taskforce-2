import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Спасибо, всё очень круто'
  })
  text: string;

  @ApiProperty({
    description: 'Индификатор выполненой задачи',
    example: '1234567'
  })
  idCompletedTask: string;

  @ApiProperty({
    description: 'Оценка',
    example: '5'
  })
  score: number;
}