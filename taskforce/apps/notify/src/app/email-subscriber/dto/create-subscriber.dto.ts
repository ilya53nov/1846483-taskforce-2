import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberValidateDescription } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberValidateDescription.EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: SubscriberValidateDescription.FIRST_NAME_IS_EMPTY })
  firstname: string;

  @IsNotEmpty({ message: SubscriberValidateDescription.LAST_NAME_IS_EMPTY })
  lastname: string;

  @IsNotEmpty({ message: SubscriberValidateDescription.USER_ID_IS_EMPTY })
  userId: string;
}

