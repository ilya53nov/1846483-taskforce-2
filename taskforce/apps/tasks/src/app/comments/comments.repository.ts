import { Injectable } from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  
  public async create(item: CommentEntity): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {...item.toObject()}
    });
  }

  public async findById(id: string): Promise<Comment> {
    return await this.prisma.comment.findFirst({
      where: {
        id
      }
    });
  }

  public async findByTask(idTask: string): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: {
        taskId: idTask
      }
    });
  }

  public async destroy(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id
      }
    });
  } 
}
