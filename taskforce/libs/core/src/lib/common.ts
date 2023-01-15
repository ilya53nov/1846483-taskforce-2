import { UserRole } from '@taskforce/shared-types';

export const isCustomer = (userRole: UserRole): boolean => {
  return userRole === UserRole.Customer;
}

export const transformTags = (tags: string[]): string[] => {
  return  Array.from(new Set(tags.map((item) => item.toLowerCase().trim().replace(' ', ''))));
}
