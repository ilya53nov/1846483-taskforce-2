import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Наименование категории',
    example: 'Backend'
  })  
  title: string;
}
