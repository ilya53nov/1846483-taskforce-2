import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, mongoDbOptions } from '@taskforce/core';
import { RabbitmqService } from '@taskforce/shared-types';
import { mailOptions } from '../config/mail.config';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { EmailSubscriberService } from './email-subscriber/email-subscriber.service';
import { MailModule } from './email/email.module';
import { MailService } from './email/email.service';
import { validateEnvironments } from './env.validation';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments,
    }),
    ClientsModule.registerAsync([
      {
        name: RabbitmqService.Notify,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    MailModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService, EmailSubscriberService, EmailSubscriberModule, MailService, TasksService],
  exports: [EmailSubscriberModule]
})
export class AppModule {}
