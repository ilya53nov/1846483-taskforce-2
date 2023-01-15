import {
  Controller,
  Get,
  Body,
  Param,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTag, ParametrKey, Route } from '@taskforce/shared-types';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ReviewDto } from './dto/review.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { AccessTokenGuard, GetUser } from '@taskforce/core';

@ApiTags(ApiTag.Users)
@UseGuards(AccessTokenGuard)
@Controller(Route.User)
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Get(ParametrKey.Rout)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getUser(@Param(ParametrKey.Id, MongoidValidationPipe) userId: string) {
    return await this.taskUserService.getUser(userId);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async updateUser(@GetUser(ParametrKey.Id) userId: string, @Body() updateUserDto: UpdateTaskUserDto) {
    return await this.taskUserService.updateUser(userId, updateUserDto);
  }
  
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Put(Route.ChangePassword)
  async changePassword(@GetUser(ParametrKey.Id) userId: string, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.taskUserService.changePassword(changePasswordDto, userId);
  }

  @Put(`${ParametrKey.Rout}/${Route.Review}`)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async leaveReview(@Param(ParametrKey.Id) userId: string, @Body() reviewDto: ReviewDto) {
    return await this.taskUserService.leaveReview(userId, reviewDto);
  }

}
