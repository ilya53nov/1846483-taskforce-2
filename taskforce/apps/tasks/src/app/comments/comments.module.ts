import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentMemoryRepository } from './comment-memory.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentMemoryRepository, CommentsService],
  imports: [CommentsModule],
})
export class CommentsModule {}
