import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTag, CommandEvent, ParametrKey, Route, Subscriber, TaskStatus, UserRole } from '@taskforce/shared-types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskRdo } from './rdo/task.rdo';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SetExecuterDto } from './dto/set-executer.dto';
import { TaskQuery } from './query/task.query';
import { EventPattern } from '@nestjs/microservices';
import { AccessTokenGuard, GetUser, Roles, RolesGuard } from '@taskforce/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { TaskValidation } from './task.constant';

@ApiTags(ApiTag.Tasks)
@Controller(Route.Tasks)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({
    type: CreateTaskDto,
    status: HttpStatus.CREATED,
  })

  @Post()
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  create(@Body() createTaskDto: CreateTaskDto,@GetUser(ParametrKey.Id) userId: string) {
    return this.taskService.create(createTaskDto, userId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(Route.MyTasks)
  @UseGuards(AccessTokenGuard)
  getMyTasks(@Query(ParametrKey.Status) taskStatus: TaskStatus, @GetUser(ParametrKey.Id) userId: string, @GetUser(ParametrKey.Role) userRole: UserRole) {
    return this.taskService.getMyTasks(userId, taskStatus, userRole);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @EventPattern({ cmd: CommandEvent.AddTask })
  sendTasksToNotifyService(subscriber: Subscriber) {
    
    return this.taskService.sendTasksToNotifyService(subscriber);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(Route.NewTasks)
  @Roles(UserRole.Executor)
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  getNewTasks(@Query() query: TaskQuery) {
    return this.taskService.getNewTasks(query);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(ParametrKey.Rout)
  findOne(@Param(ParametrKey.Id) taskId: string) {
    return this.taskService.findOne(taskId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Patch(ParametrKey.Rout)
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  update(@Param(ParametrKey.Id) taskId: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser(ParametrKey.Id) userId: string) {
    return this.taskService.update(taskId, updateTaskDto, userId);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(ParametrKey.Rout)
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  remove(@Param(ParametrKey.Id) taskId: string, @GetUser(ParametrKey.Id) userId: string) {
    return this.taskService.remove(taskId, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(`${ParametrKey.Rout}/${Route.ChangeStatus}`)
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  changeStatus(@Param(ParametrKey.Id) taskId: string, @GetUser(ParametrKey.Id) userId: string, @Body() status: ChangeStatusDto) {
    return this.taskService.changeStatus(taskId, userId, TaskStatus[status.newStatus]);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post(`${ParametrKey.Rout}/${Route.Reaction}`)
  @Roles(UserRole.Executor)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  setReaction(@Param(ParametrKey.Id) taskId: string, @GetUser(ParametrKey.Id) userId: string) {
    return this.taskService.setReaction(taskId, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN
  })
  @Post(`${ParametrKey.Rout}/${Route.Executer}`)
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  setExecuter(@Param(ParametrKey.Id) taskId: string, @GetUser(ParametrKey.Id) userId: string, @Body() executerDto: SetExecuterDto) {
    return this.taskService.setExecuter(taskId, userId, executerDto);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(`${ParametrKey.Rout}/${Route.Reactions}`)
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  getReactions(@Param(ParametrKey.Id) taskId: string) {
    return this.taskService.getReactions(taskId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN
  })
  @Patch(`${ParametrKey.Rout}/${Route.Cancel}`)
  @Roles(UserRole.Executor)
  @UseGuards(RolesGuard) 
  @UseGuards(AccessTokenGuard)
  cancelTaskByExecuter(@Param(ParametrKey.Id) taskId: string, @GetUser(ParametrKey.Id) userId: string) {
    return this.taskService.cancelTaskByExecuter(taskId, userId);
  }

  @Post(`${ParametrKey.Rout}/${Route.UploadImage}`)
  @UseInterceptors(FileInterceptor(ParametrKey.File))
  @UseGuards(AccessTokenGuard)
  public async uploadFile(
    @Param(ParametrKey.Id) taskId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: TaskValidation.Image.maxSize }),
          new FileTypeValidator({ fileType: TaskValidation.Image.fileType }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    return this.taskService.updateImage(taskId, {image: file.filename});
  }
}
