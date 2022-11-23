import { City } from '@taskforce/shared-types';

export class UpdateTaskUserDto {
  firstname: string;
  lastname: string;
  dateBirth: Date;
  info: string;
  specialization: string;
  city: City;
}
