import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitmqService } from '@taskforce/shared-types';
import { getTasksRabbitMqConfig } from 'apps/notify/config/rabbitmq.config';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { MailModule } from '../email/email.module';
import { MailService } from '../email/email.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    EmailSubscriberModule,
    MailModule,
    ClientsModule.registerAsync([
      {
        name: RabbitmqService.Tasks,
        useFactory: getTasksRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),

  ],
  providers: [
    MailService,
    EmailSubscriberService,
    TasksService,
    
  ],
  controllers: [TasksController],
  exports: [ClientsModule]
})
export class TasksModule {}