import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { TaskUserEntity } from './entities/task-user.entity';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import dayjs = require('dayjs');

@Injectable()
export class TaskUserMemoryRepository implements CRUDRepository<TaskUserEntity, string, User> {
  private repository: {[key: string]: User} = {};

  public async create(item: TaskUserEntity): Promise<User> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID(), _createdAt: dayjs().format(), _reviews: []};
    
    this.repository[entry._id] = entry;
    return {...entry};
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskUserEntity): Promise<User> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.repository[id];
  }
}
