import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { TaskUserService } from './task-user/task-user.service';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { jwtAccessOptions, jwtRefreshOptions } from '@taskforce/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getServeStaticConfig, staticOptions } from '../config/static.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: USER_ENV_FILE_PATH,
      load: [mongoDbOptions, jwtAccessOptions, jwtRefreshOptions, rabbitMqOptions, staticOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticConfig,
      inject: [ConfigService],
    }),
    TaskUserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, TaskUserService],
  exports: [TaskUserModule],
})
export class AppModule {}
