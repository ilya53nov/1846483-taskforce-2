import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import emailConfig, { getSmtpConfig } from './email/config/email.config';
import { SMTP_ENV_FILE_PATH } from './email/email.constant';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: SMTP_ENV_FILE_PATH,
      load: [emailConfig],
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
