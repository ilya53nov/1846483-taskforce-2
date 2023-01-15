import { TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class NewTaskRdo {
  @Expose()
  id: string;

  @Expose()
  header: string;

  @Expose()
  description: string;

  @Expose()
  categoryTitle: string;

  @Expose()
  cost: number;

  @Expose()
  dateExecutionAt?: Date;

  @Expose()
  image: string;

  @Expose()
  address: string;

  @Expose()
  tags: string[];

  @Expose()
  status: TaskStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  authorId: string;

  @Expose()
  reactionsCount: number;

  @Expose()
  commentsCount: number;
}
