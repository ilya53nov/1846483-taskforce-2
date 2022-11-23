import { City, UserRole } from '@taskforce/shared-types';
import {Expose} from 'class-transformer';

export class UserRdo {
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
