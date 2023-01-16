import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Subscriber } from '@taskforce/shared-types';
import { SUBSCRIBERS_COLLECTION_NAME } from './email-subscriber.constant';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public lastname: string;

  @Prop()
  public userId: string;

  @Prop()
  public dateLastNotify: Date; 
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
