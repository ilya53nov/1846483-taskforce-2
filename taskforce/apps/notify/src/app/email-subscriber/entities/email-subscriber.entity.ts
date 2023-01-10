import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userId: string;
  public dateLastNotify: Date;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.lastname = entity.lastname;
    this.firstname = entity.firstname;
    this.id = entity.id ?? '';
    this.dateLastNotify = entity.dateLastNotify;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
