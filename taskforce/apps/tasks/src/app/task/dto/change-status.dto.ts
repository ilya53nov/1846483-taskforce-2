import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';
import { IsString } from 'class-validator';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Новый статус задания',
    example: 'В работе',
    enum: TaskStatus,
  })
  @IsString()
  newStatus: TaskStatus;
}
