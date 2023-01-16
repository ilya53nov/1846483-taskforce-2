import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, RabbitmqService } from '@taskforce/shared-types';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSubscriberEntity } from '../email-subscriber/entities/email-subscriber.entity';
import { MailService } from '../email/email.service';
import { SUBSCRIBER_NOT_FOUND } from './tasks.constant';

@Injectable()
export class TasksService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
    @Inject(RabbitmqService.Tasks) private readonly rabbitClient: ClientProxy,
  ) {}

    public async getTasks(userId) {
      const existsSubscriber = await this.emailSubscriberRepository.findById(userId);
  
      if (!existsSubscriber) {
        throw new Error(SUBSCRIBER_NOT_FOUND);
      }

      this.rabbitClient.emit(
        { cmd: CommandEvent.AddTask },
        existsSubscriber
      );     
    }

    public async sendTasksToEmail(data) {
      const {subscriber, tasks} = data;

      this.mailService.sendNotifyNewTasks(subscriber, tasks);

      subscriber.dateLastNotify = new Date();

      const updatedSubscriber = new EmailSubscriberEntity(subscriber);

      await this.emailSubscriberRepository.update(subscriber._id, updatedSubscriber);
    }
}
