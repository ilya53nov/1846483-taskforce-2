import { Module } from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { TaskUserController } from './task-user.controller';
import { TaskUserRepository } from './task-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ])],
  controllers: [TaskUserController],
  providers: [TaskUserRepository, TaskUserService],
  exports: [TaskUserRepository, TaskUserModule]
})
export class TaskUserModule {}
