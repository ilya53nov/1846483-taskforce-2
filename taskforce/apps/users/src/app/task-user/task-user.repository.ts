import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { TaskUserEntity } from './entities/task-user.entity';
import { TaskUserModel } from './task-user.model';

@Injectable()
export class TaskUserRepository implements CRUDRepository<TaskUserEntity, string, User> {
  constructor(
    @InjectModel(TaskUserModel.name) private readonly taskUserModel: Model<TaskUserModel>
  ) {}

  public async create(item: TaskUserEntity): Promise<User> {
    const newTaskUser = new this.taskUserModel(item);
    return newTaskUser.save();
  }

  public async findById(id: string): Promise<User> {
    return this.taskUserModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({email})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.taskUserModel.deleteOne({id});
  }

  public async update(id: string, item: TaskUserEntity): Promise<User> {
    return this.taskUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }  
}
