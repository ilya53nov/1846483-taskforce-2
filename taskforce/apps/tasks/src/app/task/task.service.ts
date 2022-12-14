import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskStatus, UserRole } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRdo } from './rdo/task.rdo';
import { TaskRepository } from './task.repository';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async create(createTaskDto: CreateTaskDto, userId: string) {   
    const task = {...createTaskDto, authorId: userId, status: TaskStatus.New, comments: [], category: {title: createTaskDto.categoryTitle}};
    const taskEntity = new TaskEntity(task);    
    const newTask = await this.taskRepository.create(taskEntity);

    return fillObject(TaskRdo, newTask);
  }

  public async getMyTasks(userId: string, taskStatus: TaskStatus) {
    // TODO check user role
    const userRole = UserRole.Customer;
    const myTasks = await this.taskRepository.getMyTasks(userId, userRole, taskStatus);

    return myTasks.map((item) => fillObject(TaskRdo, item));
  }

  public async getNewTasks(query: TaskQuery) {
    const newTasks = await this.taskRepository.getNewTasks(query);

    return newTasks.map((item) => fillObject(TaskRdo, item));
  }

  public async findOne(taskId: string) {
    const existsTask = await this.taskRepository.findById(taskId);

    return fillObject(TaskRdo, existsTask);
  }

  public async update(taskId: string, updateTaskDto: UpdateTaskDto) {   
    const updateTask = {...updateTaskDto, category: {title: updateTaskDto.categoryTitle}};
    const task = await this.taskRepository.findById(taskId);
    const taskEntity = new TaskEntity({...task, ...updateTask});   
    const updatedTask = await this.taskRepository.update(taskId, taskEntity);

    return fillObject(TaskRdo, updatedTask);
  }

  public async remove(taskId: string) {
    await this.taskRepository.destroy(taskId);
  }

  public async changeStatus(taskId: string, userId: string, newStatus: string) {
    const updatedTask = await this.taskRepository.changeStatus(taskId, newStatus);

    return fillObject(TaskRdo, updatedTask);
  }

  public async setReaction(taskId: string, userId: string) {
    const { reactions } = await this.taskRepository.getReactions(taskId);

    reactions.push(userId);

    return await this.taskRepository.setReactions(taskId, reactions);
  }

  public async getReactions(taskId: string) {
    return await this.taskRepository.getReactions(taskId);
  }

  public async setExecuter(taskId: string, userId: string, executerDto: SetExecuterDto) {
    return await this.taskRepository.setExecuter(executerDto.executerId, taskId);
  }
}
