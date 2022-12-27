import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('smtp', () => ({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
}));

export function getSmtpConfig() {
  return {
    useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
      transport: {
        host: configService.get<string>('smtp.host'),
        port: configService.get<number>('smtp.port'),
      },
    }),
    inject: [ConfigService],
  };
}