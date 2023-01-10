import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ConfigModule } from '@nestjs/config';
import { TASKS_ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';

@Module({
  imports: [
    TaskModule,
    CommentsModule,
    PrismaModule,
    CategoryModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: TASKS_ENV_FILE_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
