import { City } from './city.enum';
import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  city: City;
  role: UserRole;
  avatar?: string;
  dateBirth: Date;
  passwordHash: string;
}
