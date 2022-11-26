import { Module } from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { TaskUserController } from './task-user.controller';
import { TaskUserMemoryRepository } from './task-user-memory.repository';

@Module({
  controllers: [TaskUserController],
  providers: [TaskUserMemoryRepository, TaskUserService],
  exports: [TaskUserMemoryRepository, TaskUserModule]
})
export class TaskUserModule {}
