import { ConfigService, registerAs } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { Route } from '@taskforce/shared-types';

export const mailOptions = registerAs('mail', () => ({
  host: process.env.MAIL_SMTP_HOST,
  port: process.env.MAIL_SMTP_PORT,
  user: process.env.MAIL_USER_NAME,
  password: process.env.MAIL_USER_PASSWORD,
  from: process.env.MAIL_FROM,
}));

const taskListHelper = (context, options) => {
  let returnString = "";

  for (let i = 0; i < context.length; i++) {
    returnString = returnString + options.fn(context[i]);
  }

  return returnString;
};

export function getMailConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('mail.host'),
        port: configService.get<number>('mail.port'),
        secure: false,
        auth: {
          user: configService.get<string>('mail.user'),
          pass: configService.get<string>('mail.password')
        }
      },
      defaults: {
        from: configService.get<string>('mail.from'),
      },
      template: {
        dir: path.resolve(__dirname, Route.Assets),
        adapter: new HandlebarsAdapter({'taskList': taskListHelper}),

        options: {
          strict: false
        }
      }
    }),
    inject: [ConfigService],
  }
}
