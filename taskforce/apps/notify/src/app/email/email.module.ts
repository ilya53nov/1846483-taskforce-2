import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '../../../config/mail.config';
import { MailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
  ],
  providers: [
    MailService,
  ],
  exports: [
    MailModule
  ]
})
export class MailModule {}
