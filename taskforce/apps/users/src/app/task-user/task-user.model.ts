import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, Collection, Review, User, UserRole } from '@taskforce/shared-types';

@Schema({
  collection: Collection.Users,
})
export class TaskUserModel extends Document implements User {
  @Prop({default: Date()})
  _createdAt: Date;

  @Prop({
    required: true,
  })
  firstname: string;
    
  @Prop({
    required: true,
  })
  lastname: string;
    
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
    
  @Prop({
    required: true,
    type: String,
    enum: City,
  })
  city: City;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  role: UserRole;

  @Prop()
  avatar?: string;

  @Prop()
  _reviews?: Review[];

  @Prop({
    required: true,
    type: Date,
  })
  dateBirth: Date;

  @Prop({
    required: true,
  })  
  passwordHash: string;

  @Prop({default: null})
  refreshTokenHash: string;
  
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
