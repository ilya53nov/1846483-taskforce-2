import { Injectable, UnauthorizedException } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/entities/task-user.entity';
import { AuthorizationBearer, AuthUserDescription } from './auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRdo } from '../task-user/rdo/user.rdo';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../../config/jwt.config';
import { User, UserRole } from '@taskforce/shared-types';

type PayloadJwtService = {
  sub: string,
  email: string,
  role: UserRole,
  lastname: string,
  firstname: string,
};

type JwtToken = {
  accessToken: string,
  refreshToken: string,
}

@Injectable()
export class AuthService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  public async register(userDto: CreateUserDto) {
    const taskUser = { ...userDto, avatar: '', passwordHash: '', refreshTokenHash: ''};

    const existUser = await this.taskUserRepository
      .findByEmail(userDto.email);

    if (existUser) {
      throw new UnauthorizedException(AuthUserDescription.Exists);
    }

    const userEntity = await new TaskUserEntity(taskUser)
      .setPassword(userDto.password)

    const newUser = await this.taskUserRepository.create(userEntity);

    const payload = this.getPayloadJwtService(newUser);

    const tokens = await this.getTokens(payload);

    this.updateRefreshToken(newUser, tokens.refreshToken);

    return fillObject(UserRdo, newUser);
  }

  private async verifyUser(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AuthUserDescription.NotFound);
    }

    const taskUserEntity = new TaskUserEntity(existUser);

    if (! await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserDescription.PasswordWrong);
    }

    return taskUserEntity.toObject();
  }

  public async loginUser(loginTaskUserDto: LoginUserDto) {
    const user = await this.verifyUser(loginTaskUserDto);    

    const payload = this.getPayloadJwtService(user);

    const tokens = await this.getTokens(payload);

    this.updateRefreshToken(user, tokens.refreshToken);

    return tokens;
  }

  private getPayloadJwtService(user: User): PayloadJwtService {
    return {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname
    };    
  }

  private async getTokens(payload: PayloadJwtService): Promise<JwtToken> {
    return {
      accessToken: await this.jwtService.signAsync(payload, await this.jwtConfig.getJwtAccessConfig()),
      refreshToken: await this.jwtService.signAsync(payload, await this.jwtConfig.getJwtRefreshConfig()),
    }
  }

  private async updateRefreshToken(user: User, refreshToken: string) {
    const userEntity = await new TaskUserEntity(user)
      .setRefreshToken(refreshToken)    

    this.taskUserRepository.update(userEntity._id, userEntity);
  }

  public async refreshTokens(email: string, bearerToken: string) {  
    if (!bearerToken || !email) {
      throw new UnauthorizedException(AuthUserDescription.AccessDenied);
    }
    const refreshToken = bearerToken.replace(AuthorizationBearer, '').trim();

    const existUser = await this.taskUserRepository.findByEmail(email);

    const taskUserEntity = await new TaskUserEntity(existUser);

    if (! await taskUserEntity.compareRefreshToken(refreshToken)) {
      throw new UnauthorizedException(AuthUserDescription.AccessDenied);
    }

    const payload = this.getPayloadJwtService(existUser);

    const tokens = await this.getTokens(payload);

    this.updateRefreshToken(existUser, tokens.refreshToken);

    return tokens;
  }
  
}
