import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskStatus } from '@taskforce/shared-types';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskRdo } from './rdo/task.rdo';
import { TaskMemoryRepository } from './task-memory.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskMemoryRepository) {}

  public async create(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    const taskEntity = await new TaskEntity(createTaskDto);

    console.log(taskEntity);

    const newTask = await this.taskRepository.create(taskEntity);

    return fillObject(TaskRdo, newTask);
  }

  getMyTasks(userId: string, taskStatus: TaskStatus) {
    throw new Error('Not implemented');
  }

  getNewTasks(userId: string) {
    throw new Error('Not implemented');
  }

  findOne(taskId: string) {
    throw new Error('Not implemented');
  }

  update(taskId: string, updateTaskDto: UpdateTaskDto) {
    throw new Error('Not implemented');
  }

  remove(taskId: string) {
    throw new Error('Not implemented');
  }

  changeStatus(taskId: string, userId: string, newStatus: ChangeStatusDto) {
    throw new Error('Not implemented');
  }

  setReaction(taskId: string, userId: string) {
    throw new Error('Not implemented');
  }

  setExecuter(taskId: string, userId: string, executerDto: SetExecuterDto) {
    throw new Error('Not implemented');
  }
}
