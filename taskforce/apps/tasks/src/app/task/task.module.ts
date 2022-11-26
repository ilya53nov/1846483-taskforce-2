import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskMemoryRepository } from './task-memory.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskMemoryRepository, TaskService],
  imports: [TaskModule]
})
export class TaskModule {}
