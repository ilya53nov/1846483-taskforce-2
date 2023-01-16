import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min, Validate } from 'class-validator';
import { INVALID_TAG, TaskApiProperty, TaskValidation } from '../task.constant';
import { TagsValidator } from './validator.dto';

export class UpdateTaskDto {
  @ApiProperty(TaskApiProperty.Header)
  @IsString()
  @Length(TaskValidation.HeaderLength.min, TaskValidation.HeaderLength.max)
  header: string;

  @ApiProperty(TaskApiProperty.Description)
  @IsString()
  @Length(TaskValidation.DescriptionLength.min, TaskValidation.DescriptionLength.max)
  description: string;

  @ApiProperty(TaskApiProperty.CategoryTitle)
  @IsString()
  categoryTitle: string;

  @ApiProperty(TaskApiProperty.Cost)
  @IsNumber()
  @Min(TaskValidation.CostMin)
  cost?: number;

  @ApiProperty(TaskApiProperty.DateExecutionAt)
  dateExecutionAt?: Date;

  @ApiProperty(TaskApiProperty.Image)
  image?: string;

  @ApiProperty(TaskApiProperty.Address)
  @IsString()
  @Length(TaskValidation.AddressLength.min, TaskValidation.AddressLength.max)
  address?: string;

  @ApiProperty(TaskApiProperty.Tags)
  @Validate(TagsValidator, { message: INVALID_TAG})
  tags: string[];
}
