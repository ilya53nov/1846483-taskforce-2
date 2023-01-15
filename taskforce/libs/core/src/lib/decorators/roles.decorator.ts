import { SetMetadata } from '@nestjs/common';
import { ParametrKey } from '@taskforce/shared-types';

export const Roles = (...roles: string[]) => SetMetadata(ParametrKey.Roles, roles);
