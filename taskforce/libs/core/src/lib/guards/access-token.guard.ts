import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_ACCESS_DESCRIPTION } from '../config/jwt.config';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JWT_ACCESS_DESCRIPTION) {}