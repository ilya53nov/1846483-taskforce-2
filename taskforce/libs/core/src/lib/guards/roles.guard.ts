import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ParametrKey } from '@taskforce/shared-types';

const FORBIDDEN_ROLE_MESSAGE = 'Запрещено для данной роли';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>(ParametrKey.Roles, context.getHandler());

    if (roles) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      const isRightRole = roles.includes(user.role);
  
      if (!isRightRole) {
        throw new ForbiddenException(FORBIDDEN_ROLE_MESSAGE);
      }
    }

    return true;
  }
}
