import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length, Max, Min } from 'class-validator';
import { ReviewApiProperty, ReviewValidation } from '../../app.constant';

export class ReviewDto {
  @ApiProperty(ReviewApiProperty.Text)
  @Length(ReviewValidation.TextLength.min, ReviewValidation.TextLength.max)
  text: string;

  @ApiProperty(ReviewApiProperty.IdCompletedTask)
  @IsUUID()
  idCompletedTask: string;

  @ApiProperty(ReviewApiProperty.Score)
  @Min(ReviewValidation.Score.min)
  @Max(ReviewValidation.Score.max)
  score: number;
}
