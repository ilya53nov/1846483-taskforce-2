import { TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose({name: '_id'})
  id: string;

  @Expose()
  header: string;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  cost: number;

  @Expose()
  dateExecution?: Date;

  @Expose()
  image: string;

  @Expose()
  address: string;

  @Expose()
  tags: string[];

  @Expose()
  status: TaskStatus;
}
