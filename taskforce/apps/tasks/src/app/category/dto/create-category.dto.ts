import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Наименование категории',
    example: 'Backend'
  })  
  @IsString()
  title: string;
}
