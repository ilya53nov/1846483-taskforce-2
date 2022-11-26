import { City, UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class ExecuterUserRdo {
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
  age: number;

  @Expose()
  role: UserRole; 

  @Expose()
  rating: number;

  @Expose()
  countCompletedTask: number;

  @Expose()
  countFailedTask: number;

  @Expose()
  email: string;

  @Expose()
  info: string;

  @Expose()
  specialization: string;

  @Expose()
  placeInRating: number;
}