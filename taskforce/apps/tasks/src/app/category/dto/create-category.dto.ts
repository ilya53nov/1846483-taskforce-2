import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CategoryApiProperty } from '../category.constant';

export class CreateCategoryDto {
  @ApiProperty(CategoryApiProperty.Title)  
  @IsString()
  title: string;
}
