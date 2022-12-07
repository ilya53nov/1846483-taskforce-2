import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TaskModule, CommentsModule, PrismaModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
