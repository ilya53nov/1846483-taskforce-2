import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';
import { CommentApiProperty, CommentValidation } from '../comment.constant';

export class CreateCommentDto {
  @ApiProperty(CommentApiProperty.Text)
  @IsString()
  @Length(CommentValidation.CommentLength.min, CommentValidation.CommentLength.max)
  text: string;

  @ApiProperty(CommentApiProperty.TaskId)
  @IsUUID()
  taskId: string;
}
