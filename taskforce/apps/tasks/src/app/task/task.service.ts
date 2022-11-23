import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    throw new Error('Not implemented');
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

  changeStatus(taskId: string, userId: string, newStatus: TaskStatus) {
    throw new Error('Not implemented');
  }

  setReaction(taskId: string, userId: string) {
    throw new Error('Not implemented');
  }

  setExecuter(taskId: string, userId: string) {
    throw new Error('Not implemented');
  }
}
