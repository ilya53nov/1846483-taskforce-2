import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './email.service';
import { getMailConfig } from '../../config/mail.config';

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
