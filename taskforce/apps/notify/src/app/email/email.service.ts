import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_TASKS_SUBJECT } from './email.constant';
import { Route, Subscriber, Task } from '@taskforce/shared-types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: Route.AddSubscriberTemlate,
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: subscriber.email,
      }
    });
  }

  public async sendNotifyNewTasks(subscriber: Subscriber, tasks: Task[]) {
  await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_NEW_TASKS_SUBJECT,
      template: Route.NewTasksTemplate,
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        tasks: tasks        
      }
    });    

  }
}
