import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TaskApiProperty } from '../task.constant';

export class SetExecuterDto {
  @ApiProperty(TaskApiProperty.ExecutorId)
  @IsString()
  executerId: string;
}
