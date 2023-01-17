import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { MailModule } from '../email/email.module';
import { MailService } from '../email/email.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitmqService } from '@taskforce/shared-types';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    MailModule,
    ClientsModule.registerAsync([
      {
        name: Symbol(RabbitmqService.Notify),
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    MailService
  ],
  exports: [EmailSubscriberModule, EmailSubscriberRepository]
})
export class EmailSubscriberModule {}
