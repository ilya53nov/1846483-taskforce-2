import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min, Validate } from 'class-validator';
import { INVALID_TAG, TaskApiProperty, TaskValidation } from '../task.constant';
import { TagsValidator } from './validator.dto';

export class CreateTaskDto {
  @ApiProperty(TaskApiProperty.UserId)
  userId: string;

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
  @IsOptional()
  @IsNumber()
  @Min(TaskValidation.CostMin)
  cost?: number;

  @ApiProperty(TaskApiProperty.DateExecutionAt)
  @IsOptional()
  dateExecutionAt?: Date;

  @ApiProperty(TaskApiProperty.Image)
  @IsOptional()
  image?: string;

  @ApiProperty(TaskApiProperty.Address)
  @IsOptional()
  @IsString()
  @Length(TaskValidation.AddressLength.min, TaskValidation.AddressLength.max)
  address?: string;

  @ApiProperty(TaskApiProperty.Tags)
  @IsOptional()
  @Validate(TagsValidator, { message: INVALID_TAG})
  tags: string[];
}
