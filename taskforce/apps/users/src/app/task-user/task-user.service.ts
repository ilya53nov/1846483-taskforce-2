import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { AuthUserDescription } from '../auth/auth.constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ReviewDto } from './dto/review.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { TaskUserEntity } from './entities/task-user.entity';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ExecuterUserRdo } from './rdo/executer-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { TaskUserRepository } from './task-user.repository';

@Injectable()
export class TaskUserService {
  constructor(private readonly taskUserRepository: TaskUserRepository) {}  
             
  public async getUser(id: string) {
    const existUser = await this.taskUserRepository.findById(id);
    if (!existUser) {
      throw new Error(AuthUserDescription.NotFound);
    }
    const taskUserEntity = new TaskUserEntity(existUser).toObject();

    if (existUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, taskUserEntity);
    }
    
    return fillObject(ExecuterUserRdo, taskUserEntity);
  }

  public async updateUser(id: string, updateUserDto: UpdateTaskUserDto) {
    const existUser = await this.taskUserRepository.findById(id);

    if (!existUser) {
      throw new Error(AuthUserDescription.NotFound);
    }

    const taskUser = { ...existUser, ...updateUserDto};
    const userEntity = await new TaskUserEntity(taskUser);
    const updatedUser = this.taskUserRepository.update(id, userEntity);

    return fillObject(UserRdo, updatedUser);
  }

  public async changePassword(changePasswordDto: ChangePasswordDto, id: string) {
    const { currentPassword, newPassword } = changePasswordDto;
    const existUser = await this.taskUserRepository.findById(id);

    if (!existUser) {
      throw new Error(AuthUserDescription.NotFound);
    }
    
    const taskUserEntity = await new TaskUserEntity(existUser);

    if(! await taskUserEntity.comparePassword(currentPassword)) {
      throw new Error(AuthUserDescription.PasswordWrong);
    }

    await taskUserEntity.setPassword(newPassword);

    await this.taskUserRepository.update(id, taskUserEntity);
  }

  public async leaveReview(id: string, reviewDto: ReviewDto) {
    const existUser = await this.taskUserRepository.findById(id);

    if (!existUser) {
      throw new Error(AuthUserDescription.NotFound);
    }
    
    existUser._reviews.push(reviewDto);

    const taskUserEntity = await new TaskUserEntity(existUser);
    await this.taskUserRepository.update(id, taskUserEntity);
  } 
}
