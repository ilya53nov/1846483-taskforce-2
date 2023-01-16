import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { RabbitmqService } from '@taskforce/shared-types';
import { getMulterConfig } from '@taskforce/core';

@Module({
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, CategoryService],
  imports: [
    TaskModule,
    PrismaModule,
    CategoryModule,
    ClientsModule.registerAsync([
      {
        name: RabbitmqService.Tasks,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ]
})
export class TaskModule {}
