import { EventPattern } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { CommandEvent, Route } from '@taskforce/shared-types';
import { TasksService } from './tasks.service';
import { ApiResponse } from '@nestjs/swagger';
import { Headers } from '@nestjs/common';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({})
  @Get(Route.TasksNotify)
  public async notifyNewTasks(@Headers('user-id') userId: string) {
    this.tasksService.getTasks(userId);
  }
  
  @EventPattern({ cmd: CommandEvent.SendTask})
  public async get(data) {
    this.tasksService.sendTasksToEmail(data);
  }
}
