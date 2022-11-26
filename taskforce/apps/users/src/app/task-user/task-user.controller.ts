import {
  Controller,
  Get,
  Body,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTag, Route } from '@taskforce/shared-types';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ReviewDto } from './dto/review.dto';

@ApiTags(ApiTag.Users)
@Controller(Route.User)
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getUser(@Param('id') id: string) {
    return await this.taskUserService.getUser(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateTaskUserDto) {
    return await this.taskUserService.updateUser(id, updateUserDto);
  }

  @Put(':id/change-password')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.taskUserService.changePassword(changePasswordDto, id);
  }

  @Put(':id/review')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async leaveReview(@Param('id') id: string, @Body() reviewDto: ReviewDto) {
    return await this.taskUserService.leaveReview(id, reviewDto);
  }

}
