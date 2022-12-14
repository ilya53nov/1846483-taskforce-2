import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Текст комментария',
    example: 'Всё очень круто'
  })
  @IsString()
  @Length(10, 300)
  text: string;

  @ApiProperty({
    description: 'Индификатор задачи',
    example: '4553453'
  })
  @IsUUID()
  taskId: string;
}
