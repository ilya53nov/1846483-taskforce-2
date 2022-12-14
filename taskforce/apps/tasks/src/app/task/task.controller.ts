import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTag, Route, TaskStatus } from '@taskforce/shared-types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskRdo } from './rdo/task.rdo';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { TaskQuery } from './query/task.query';

@ApiTags(ApiTag.Tasks)
@Controller(Route.Tasks)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({
    type: CreateTaskDto,
    status: HttpStatus.CREATED,
  })

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Headers('user-id') userId: string) {
    return this.taskService.create(createTaskDto, userId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(Route.MyTasks)
  getMyTasks(@Query('status') taskStatus: TaskStatus, @Headers('user-id') userId: string) {
    return this.taskService.getMyTasks(userId, taskStatus);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(Route.NewTasks)
  getNewTasks(@Query() query: TaskQuery) {
    return this.taskService.getNewTasks(query);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id/change-status')
  changeStatus(@Param('id') id: string, @Headers('user-id') userId: string, @Body() status: ChangeStatusDto) {
    return this.taskService.changeStatus(id, userId, TaskStatus[status.newStatus]);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post(':id/reaction')
  setReaction(@Param('id') id: string, @Headers('user-id') userId: string) {
    return this.taskService.setReaction(id, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post(':id/executer')
  setExecuter(@Param('id') id: string, @Headers('user-id') userId: string, @Body() executerDto: SetExecuterDto) {
    return this.taskService.setExecuter(id, userId, executerDto);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(':id/reactions')
  getExecuters(@Param('id') id: string) {
    return this.taskService.getReactions(id);
  }
}
