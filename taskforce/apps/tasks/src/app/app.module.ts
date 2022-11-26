import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TaskModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
