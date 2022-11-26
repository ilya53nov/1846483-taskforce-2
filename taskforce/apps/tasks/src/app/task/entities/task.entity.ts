import { Task } from '@taskforce/shared-types';

export class TaskEntity implements Task {
  public _id?: string;
  public header: string;
  public description: string;
  public category: string;
  public cost?: number;
  public dateExecution?: Date;
  public image?: string;
  public address?: string;
  public tags: string[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(task: Task) {
    this._id = task._id;
    this.header = task.header;
    this.description = task.description;
    this.category = task.category;
    this.cost = task.cost;
    this.dateExecution = task.dateExecution;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
  }  
}
