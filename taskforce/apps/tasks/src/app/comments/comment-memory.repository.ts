import { CRUDRepository } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import dayjs = require('dayjs');
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: {[key: string]: Comment} = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID(), createdAt: dayjs().format()};
    this.repository[entry._id] = entry;
    console.log({...entry});
    return {...entry};
  }

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByTask(idTask: string): Promise<Comment[]> {
    const existComment = Object.values(this.repository)
      .filter((commentItem) => commentItem.idTask === idTask);

    if (! existComment) {
      return null;
    }

    return [...existComment];
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
