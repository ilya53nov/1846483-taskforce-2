import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@taskforce/shared-types';
import { JWT_REFRESH_DESCRIPTION, JWT_REFRESH_SECRET } from '../config/jwt.config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH_DESCRIPTION) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_REFRESH_SECRET),
    });
  }

  async validate({sub, email, role }: Pick<User, 'email' | 'role'> & { sub: string}) {
    return { id: sub, email, role };
  }
}
