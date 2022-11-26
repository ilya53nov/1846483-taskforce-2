import { City, UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class CustomerUserRdo {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose({ name: '_id'})
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  city: City;

  @Expose()
  email: string;

  @Expose()
  countPublishedTask: number;

  @Expose()
  countNewTask: number;

  @Expose()
  info: string;

  @Expose()
  role: UserRole;
}