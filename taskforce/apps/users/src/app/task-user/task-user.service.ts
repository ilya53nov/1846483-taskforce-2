import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { TaskUserEntity } from './entities/task-user.entity';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ExecuterUserRdo } from './rdo/executer-user.rdo';
import { TaskUserMemoryRepository } from './task-user-memory.repository';

@Injectable()
export class TaskUserService {
  constructor(private readonly taskUserRepository: TaskUserMemoryRepository) {}  

  public async getUser(id: string) {
    const existUser = await this.taskUserRepository.findById(id);

    const taskUserEntity = new TaskUserEntity(existUser).toObject();

    if (existUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, taskUserEntity);
    }
    
    return fillObject(ExecuterUserRdo, taskUserEntity);
  }

  public async updateUser(id: string) {
    throw new Error('Not implemented');
  }

  public async leaveReview(id: string) {
    throw new Error('Not implemented');
  } 

}
