import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTag, Route } from '@taskforce/shared-types';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags(ApiTag.Comments)
@Controller(Route.Comments)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
  })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Headers('user-id') idUser: string) {
    return this.commentsService.create(idUser, createCommentDto);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @Get(`${Route.Task}/:id`)
  getCommentsTask(@Param('id') idTask: string) {
    return this.commentsService.getCommentsTask(idTask);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete(':id')
  deleteComment(@Param('id')id: string) {
    return this.commentsService.deleteComment(id);
  }

}
