import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, CategoryService],
  imports: [TaskModule, PrismaModule, CategoryModule]
})
export class TaskModule {}
