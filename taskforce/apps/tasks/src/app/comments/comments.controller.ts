import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, GetUser } from '@taskforce/core';
import { ApiTag, ParametrKey, Route } from '@taskforce/shared-types';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
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
  @UseGuards(AccessTokenGuard)
  create(@Body() createCommentDto: CreateCommentDto, @GetUser(ParametrKey.Id) userId: string) {
    return this.commentsService.create(userId, createCommentDto);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @Get(`${Route.Task}/${ParametrKey.Rout}`)
  getCommentsTask(@Param(ParametrKey.Id) taskId: string, @Query() query: CommentQuery) {
    return this.commentsService.getCommentsTask(taskId, query);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(ParametrKey.Rout)
  @UseGuards(AccessTokenGuard)
  deleteComment(@Param(ParametrKey.Id) commentId: string, @GetUser(ParametrKey.Id) userId: string) {
    return this.commentsService.deleteComment(commentId, userId);
  }
}
