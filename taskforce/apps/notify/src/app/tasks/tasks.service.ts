import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { RABBITMQ_SERVICE_TASKS } from 'apps/notify/config/rabbitmq.config';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSubscriberEntity } from '../email-subscriber/entities/email-subscriber.entity';
import { MailService } from '../email/email.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
    @Inject(RABBITMQ_SERVICE_TASKS) private readonly rabbitClient: ClientProxy,
  ) {}

    public async getTasks(userId) {
      const existsSubscriber = await this.emailSubscriberRepository.findById(userId);
  
      if (!existsSubscriber) {
        throw new Error('Пользователь не найден в подписчиках новых задач');
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
