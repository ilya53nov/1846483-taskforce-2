import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Текст комментария',
    example: 'Всё очень круто'
  })
  text: string;

  @ApiProperty({
    description: 'Индификатор задачи',
    example: '4553453'
  })
  idTask: string;
}
