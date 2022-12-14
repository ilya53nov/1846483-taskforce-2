import { City, UserRole } from '@taskforce/shared-types';
import {Expose, Transform} from 'class-transformer';

export class UserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public dateBirth: string;

  @Expose()
  public email: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;

  @Expose()
  public city: City;

  @Expose()
  public role: UserRole;
}
