import { Body, Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import dayjs = require('dayjs');
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/entities/task-user.entity';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';
import { AuthUserDescription } from './auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserRdo } from '../task-user/rdo/user.rdo';

@Injectable()
export class AuthService {
  constructor(private readonly taskUserRepository: TaskUserMemoryRepository) {}

  public async register(userDto: CreateUserDto) {
    const taskUser = { ...userDto, avatar: '', dateBirth: dayjs(userDto.dateBirth).toDate(), passwordHash: '' };

    const existUser = await this.taskUserRepository
      .findByEmail(userDto.email);

    if (existUser) {
      throw new Error(AuthUserDescription.Exists);
    }

    const userEntity = await new TaskUserEntity(taskUser)
      .setPassword(userDto.password)

    const newUser = this.taskUserRepository.create(userEntity);

    return fillObject(UserRdo, newUser);
  }

  private async verifyUser(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AuthUserDescription.NotFound);
    }

    const taskUserEntity = new TaskUserEntity(existUser);

    if (! await this.isCorrectPassword(password, taskUserEntity)) {
      throw new Error(AuthUserDescription.PasswordWrong);
    }

    return taskUserEntity.toObject();
  }

  private async isCorrectPassword(password: string, taskUserEntity: TaskUserEntity): Promise<boolean> {
    const comparedPassword = await taskUserEntity.comparePassword(password);

    return comparedPassword;
  }

  public async login(@Body() loginTaskUserDto: LoginUserDto) {
    const verifiedUser = this.verifyUser(loginTaskUserDto); 
    return fillObject(LoggedUserRdo, verifiedUser);   
  }

  public async changePassword(changePasswordDto: ChangePasswordDto, id: string) {
    const { currentPassword, newPassword } = changePasswordDto;

    const existUser = await this.taskUserRepository.findById(id);
    const taskUserEntity = new TaskUserEntity(existUser);

    if(this.isCorrectPassword(currentPassword, taskUserEntity)) {
      taskUserEntity.setPassword(newPassword);
    }
  }
}
