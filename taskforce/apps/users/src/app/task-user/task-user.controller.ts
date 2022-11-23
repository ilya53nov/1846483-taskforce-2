import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTag, Route } from '@taskforce/shared-types';

@ApiTags(ApiTag.Users)
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Объект пользователя'
})
@Controller(Route.User)
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.taskUserService.getUser(id);
  }
}
