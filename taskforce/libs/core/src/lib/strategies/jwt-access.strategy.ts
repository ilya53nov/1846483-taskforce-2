import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@taskforce/shared-types';
import { JWT_ACCESS_DESCRIPTION, JWT_ACCESS_SECRET } from '../config/jwt.config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS_DESCRIPTION) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,      
      secretOrKey: configService.get<string>(JWT_ACCESS_SECRET)
    });
  }

  async validate({sub, email, role }: Pick<User, 'email' | 'role'> & { sub: string}) {
    return { id: sub, email, role };
  }
}
