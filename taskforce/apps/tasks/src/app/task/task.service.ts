import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { fillObject, transformTags } from '@taskforce/core';
import { CommandEvent, Route, Subscriber, Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRdo } from './rdo/task.rdo';
import { TaskRepository } from './task.repository';
import { TaskQuery } from './query/task.query';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE_TASKS } from '../../config/rabbitmq.config';
import { BUSY_EXECUTOR, INVALID_EXECUTOR, INVALID_TASK_STATUS, NOT_FOUND_EXECUTER, NOT_FOUND_TASK, NOT_OWNER } from './task.constant';
import { NewTaskRdo } from './rdo/new-task.rdo';
import { ImageTaskDto } from './dto/image-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(RABBITMQ_SERVICE_TASKS) private readonly rabbitClient: ClientProxy,
  ) {}

  public async create(createTaskDto: CreateTaskDto, userId: string) {   
    const task = {...createTaskDto, authorId: userId, status: TaskStatus.New, comments: [], category: {title: createTaskDto.categoryTitle}, tags: transformTags(createTaskDto.tags)};
    const taskEntity = new TaskEntity(task);    
    const newTask = await this.taskRepository.create(taskEntity);

    return fillObject(TaskRdo, newTask);
  }

  public async getMyTasks(userId: string, taskStatus: TaskStatus, userRole: UserRole) {
    const myTasks = await this.taskRepository.getMyTasks(userId, userRole, taskStatus);

    return myTasks.map((item) => fillObject(TaskRdo, item));
  }

  public async sendTasksToNotifyService(subscriber: Subscriber) {
    const tasks = await this.taskRepository.findAllAfterDate(new Date(subscriber.dateLastNotify));

    this.rabbitClient.emit(
      { cmd: CommandEvent.SendTask },
      {tasks, subscriber}
    );
  }

  public async getNewTasks(query: TaskQuery) {
    const newTasks = await this.taskRepository.getNewTasks(query);

    return newTasks.map((item) => fillObject(NewTaskRdo, {...item, commentsCount: item.comments.length, reactionsCount: item.reactions.length}));
  }

  public async findOne(taskId: string) {
    const existsTask = await this.taskRepository.findById(taskId);

    return fillObject(TaskRdo, existsTask);
  }

  public async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string) {   
    this.checkOwner(taskId, userId);   
    
    const updateTask = {...updateTaskDto, category: {title: updateTaskDto.categoryTitle}};
    const task = await this.taskRepository.findById(taskId);
    const taskEntity = new TaskEntity({...task, ...updateTask});   
    const updatedTask = await this.taskRepository.update(taskId, taskEntity);

    return fillObject(TaskRdo, updatedTask);
  }

  public async remove(taskId: string, userId: string) {
    this.checkOwner(taskId, userId);

    await this.taskRepository.destroy(taskId);
  }

  public async cancelTaskByExecuter(taskId: string, userId: string) {
    const task = await this.checkTask(taskId);

    const taskExecuterId: string | null = task.executerId;

    if (!taskExecuterId) {
      throw new NotFoundException(NOT_FOUND_EXECUTER);
    }

    if (!taskExecuterId.includes(userId)) {
      throw new ForbiddenException(INVALID_EXECUTOR);
    }

    const currentTaskStatus = task.status;

    if (currentTaskStatus !== TaskStatus.InWork) {
      throw new ForbiddenException(INVALID_TASK_STATUS);
    }

    await this.taskRepository.changeStatus(taskId, TaskStatus.Cancelled);

    const updateTask = {executerId: ''};

    const taskEntity = new TaskEntity({...task, ...updateTask });
    
    const updatedTask = await this.taskRepository.update(taskId, taskEntity)

    return fillObject(TaskRdo, updatedTask);

  }

  public async changeStatus(taskId: string, userId: string, newStatus: string) {
    this.checkOwner(taskId, userId);

    let requiredStatus: TaskStatus;

    switch (newStatus) {
      case TaskStatus.Cancelled:
        requiredStatus = TaskStatus.New
        break;
      case TaskStatus.Done:
        requiredStatus = TaskStatus.InWork
        break;     
      case TaskStatus.InWork:
        requiredStatus = TaskStatus.New
        break;   
    }

    const task = await this.checkTask(taskId);
    const currentTaskStatus = task.status;

    if (requiredStatus !== currentTaskStatus) {
      throw new ForbiddenException(INVALID_TASK_STATUS);
    }    

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
    const task = await this.checkTask(taskId);

    if (!task.reactions.some((item) => item.includes(executerDto.executerId))) {
      throw new NotFoundException(NOT_FOUND_EXECUTER);
    }

    const tasksExecuter = await this.taskRepository.getTasksExecuter(executerDto.executerId, TaskStatus.InWork);
    
    if (tasksExecuter.length > 0) {
      throw new ForbiddenException(BUSY_EXECUTOR);
    }
    
    const updatedTask = await this.changeStatus(taskId, userId, TaskStatus.InWork);
    
    await this.taskRepository.setExecuter(executerDto.executerId, taskId);
    
    return updatedTask;
  }

  private async checkOwner(taskId: string, userId: string) {
    const task = await this.checkTask(taskId);

    if (task.authorId !== userId) {
      throw new ForbiddenException(NOT_OWNER);
    }    
  }

  private async checkTask(taskId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(NOT_FOUND_TASK);
    }

    return task;
  }

  public async updateImage(taskId: string, imageTaskDto: ImageTaskDto): Promise<Task> {
    const { image } = imageTaskDto;
    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/${Route.Static}/${image}`;
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new NotFoundException(NOT_FOUND_TASK);
    }

    const task = { ...existTask, image: imagePath};
    const taskEntity = await new TaskEntity(task);
    const updatedTask = this.taskRepository.update(taskId, taskEntity);

    return updatedTask;
  }
}
