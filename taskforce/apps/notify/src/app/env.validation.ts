import { EnvValidationMessage, PortDB } from '@taskforce/shared-types';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(PortDB.Min)
  @Max(PortDB.Max)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.RMQUserRequired
  })
  public RABBIT_USER: string;

  @IsString({
    message: EnvValidationMessage.RMQPasswordRequired
  })
  public RABBIT_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RMQHostRequired
  })
  public RABBIT_HOST: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue
  })
  public RABBIT_NOTIFY_SERVICE_QUEUE: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue
  })
  public RABBIT_TASKS_SERVICE_QUEUE: string;  

  @IsString({
    message: EnvValidationMessage.MailServerHostRequired
  })
  public MAIL_SMTP_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.MailServerPortRequired
  })
  @Min(PortDB.Min)
  @Max(PortDB.Max)
  public MAIL_SMTP_PORT: number;

  @IsString({
    message: EnvValidationMessage.MailServerUserNameRequired
  })
  public MAIL_USER_NAME: string;

  @IsString({
    message: EnvValidationMessage.MailServerPasswordRequired
  })
  public MAIL_USER_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.MailServerDefaultFromRequired
  })
  public MAIL_FROM: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
