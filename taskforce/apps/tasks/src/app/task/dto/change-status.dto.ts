import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Новый статус задания',
    example: 'В работе',
    enum: TaskStatus,
  })
  newStatus: TaskStatus;
}
