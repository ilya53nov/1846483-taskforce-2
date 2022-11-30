import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { USER_ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: USER_ENV_FILE_PATH,
      load: [databaseConfig],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    TaskUserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
