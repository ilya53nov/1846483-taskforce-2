import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';
import { IsString } from 'class-validator';
import { TaskApiProperty } from '../task.constant';

export class ChangeStatusDto {
  @ApiProperty(TaskApiProperty.NewStatus)
  @IsString()
  newStatus: TaskStatus;
}
