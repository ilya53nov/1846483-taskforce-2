import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length, Max, Min } from 'class-validator';

const REVIEW_TEXT_LENGTH_MIN = 50;
const REVIEW_TEXT_LENGTH_MAX = 500;
const SCORE_MIN = 1;
const SCORE_MAX = 5;

export class ReviewDto {
  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Спасибо, всё очень круто'
  })
  @Length(REVIEW_TEXT_LENGTH_MIN, REVIEW_TEXT_LENGTH_MAX)
  text: string;

  @ApiProperty({
    description: 'Индификатор выполненой задачи',
    example: '1234567'
  })
  @IsUUID()
  idCompletedTask: string;

  @ApiProperty({
    description: 'Оценка',
    example: '5'
  })
  @Min(SCORE_MIN)
  @Max(SCORE_MAX)
  score: number;
}
