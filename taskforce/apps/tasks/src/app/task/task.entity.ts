import { Entity } from '@taskforce/core';
import { Category, Comment, Task } from '@taskforce/shared-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public id?: string;
  public header: string;
  public description: string;
  public cost?: number;
  public image?: string;
  public address?: string;
  public tags: string[];
  public dateExecutionAt?: Date;
  public createdAt: Date;
  public authorId: string;
  public executerId?: string;
  public comments?: Comment[];
  public reactions?: string[];
  public status?: string;
  public category?: Category;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject(): TaskEntity {
    return {...this};
  }

  public fillEntity(task: Task) {
    this.id = task.id;
    this.header = task.header;
    this.description = task.description;
    this.cost = task.cost;
    this.dateExecutionAt = task.dateExecutionAt;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.createdAt = task.createdAt;
    this.authorId = task.authorId;
    this.executerId = task.executerId;
    this.comments = task.comments;
    this.reactions = task.reactions;
    this.status = task.status;
    this.category = task.category;
  }  
}
