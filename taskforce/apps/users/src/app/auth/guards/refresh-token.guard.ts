import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_DESCRIPTION } from 'apps/users/src/config/jwt.config';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(JWT_REFRESH_DESCRIPTION) {}
