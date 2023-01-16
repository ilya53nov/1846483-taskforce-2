import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { fillObject, getImageStaticPath, transformTags } from '@taskforce/core';
import { CommandEvent, RabbitmqService, Route, Subscriber, Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRdo } from './rdo/task.rdo';
import { TaskRepository } from './task.repository';
import { TaskQuery } from './query/task.query';
import { ClientProxy } from '@nestjs/microservices';
import { NewTaskRdo } from './rdo/new-task.rdo';
import { ImageTaskDto } from './dto/image-task.dto';
import { TaskExceptionDescription, UserExceptionDescription } from './task.constant';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(RabbitmqService.Tasks) private readonly rabbitClient: ClientProxy,
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
      throw new NotFoundException(UserExceptionDescription.NotFoundExecutor);
    }

    if (!taskExecuterId.includes(userId)) {
      throw new ForbiddenException(UserExceptionDescription.InvalidExecutor);
    }

    const currentTaskStatus = task.status;

    if (currentTaskStatus !== TaskStatus.InWork) {
      throw new ForbiddenException(TaskExceptionDescription.InvalidStatus);
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
      throw new ForbiddenException(TaskExceptionDescription.InvalidStatus);
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
      throw new NotFoundException(UserExceptionDescription.NotFoundExecutor);
    }

    const tasksExecuter = await this.taskRepository.getTasksExecuter(executerDto.executerId, TaskStatus.InWork);
    
    if (tasksExecuter.length > 0) {
      throw new ForbiddenException(UserExceptionDescription.BusyExecutor);
    }
    
    const updatedTask = await this.changeStatus(taskId, userId, TaskStatus.InWork);
    
    await this.taskRepository.setExecuter(executerDto.executerId, taskId);
    
    return updatedTask;
  }

  private async checkOwner(taskId: string, userId: string) {
    const task = await this.checkTask(taskId);

    if (task.authorId !== userId) {
      throw new ForbiddenException(UserExceptionDescription.NotOwner);
    }    
  }

  private async checkTask(taskId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(TaskExceptionDescription.NotFound);
    }

    return task;
  }

  public async updateImage(taskId: string, imageTaskDto: ImageTaskDto): Promise<Task> {
    const { image } = imageTaskDto;
    const imagePath = getImageStaticPath(process.env.HOST, process.env.PORT, Route.Static, image);
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new NotFoundException(TaskExceptionDescription.NotFound);
    }

    const task = { ...existTask, image: imagePath};
    const taskEntity = await new TaskEntity(task);
    const updatedTask = this.taskRepository.update(taskId, taskEntity);

    return updatedTask;
  }
}
