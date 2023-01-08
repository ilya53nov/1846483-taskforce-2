import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { mailOptions } from 'apps/notify/config/mail.config';
import { getMongoDbConfig, mongoDbOptions } from 'apps/notify/config/mongodb.config';
import { getRabbitMqConfig, rabbitMqOptions, RABBITMQ_SERVICE } from 'apps/notify/config/rabbitmq.config';
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
        name: RABBITMQ_SERVICE,
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
