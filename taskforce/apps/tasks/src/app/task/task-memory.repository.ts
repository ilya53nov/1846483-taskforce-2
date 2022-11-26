import { CRUDRepository } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import dayjs = require('dayjs');
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskMemoryRepository implements CRUDRepository<TaskEntity, string, Task> {
  private repository: {[key: string]: Task} = {};

  public async create(item: TaskEntity): Promise<Task> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID(), _createdAt: dayjs().format(), status: TaskStatus.New};
    this.repository[entry._id] = entry;
    console.log({...entry});
    return {...entry};
  }

  public async findById(id: string): Promise<Task> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskEntity): Promise<Task> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
