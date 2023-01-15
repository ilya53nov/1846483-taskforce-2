import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@taskforce/core';
import { Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, string, Task> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async findAllAfterDate(date: Date): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        createdAt: {
          gt: date,
        }
      }
    })
  }

  public async findById(id: string): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
        comments: true,
      }
    });
  }

  public async getNewTasks({ limit, page, sortDirection, categories, tags, cities}: TaskQuery): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        status: TaskStatus.New,
        category: {
          title: {
            in: categories,
          }
        },
        tags: tags ? {hasEvery: tags} : undefined,
        address: {
          in: cities,
        }
      },
      take: limit,
      include: {
        comments: true,
        category: true,
      },
      orderBy: [
        {
          createdAt: sortDirection,
        },
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }  

  public async destroy(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      }
    });
  }

  public async changeStatus(id: string, newStatus: string): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {status: newStatus}
    });
  }

  public async getMyTasks(userId: string, userRole: UserRole, taskStatus: TaskStatus): Promise<Task[]> {
    if (userRole === UserRole.Customer) {
      return await this.getTasksAuthor(userId, taskStatus);
    }

    return await this.getTasksExecuter(userId, taskStatus);
  }

  public async getTasksExecuter(userId: string, taskStatus: TaskStatus): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        executerId: userId,
        status: taskStatus,
      }
    });
  }

  private async getTasksAuthor(userId: string, taskStatus: TaskStatus): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        authorId: userId,
        status: taskStatus,
      }
    });
  }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();

    return await this.prisma.task.create({
      data: {
        ...entityData,
        category: {
          connectOrCreate: {
            where: {
              title: entityData.category.title,
            },
            create: {
              title: entityData.category.title,
            }
          }
        },
        comments: {
          connect: []
        }       
      },
      include: {
        comments: true,
        category: true,
      }
    });
  }

  public async update(id: string, item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();

    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...entityData,
        category: {
          connectOrCreate: {
            where: {
              title: entityData.category.title,
            },
            create: {
              title: entityData.category.title,
            }
          }
        },
        comments: {
          connect: []
        }  
      },
      include: {
        comments: true,
        category: true,
      }
    });    
  }  

  public async setExecuter(executerId: string, taskId: string): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {executerId: executerId}
    });
  }

  public async getReactions(taskId: string) {
    return await this.prisma.task.findFirst({
      where: {
        id: taskId,
      },
      select: {reactions: true}
    });
  }

  public async setReactions(taskId: string, usersId: string[]): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {reactions: usersId}
    });
  }
}
