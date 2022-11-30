import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, Collection, User, UserRole } from '@taskforce/shared-types';

@Schema({
  collection: Collection.Users,
})
export class TaskUserModel extends Document implements User {
  @Prop()
  _id: string;

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

  @Prop({
    required: true,
  })
  dateBirth: Date;

  @Prop({
    required: true,
  })  
  passwordHash: string;

}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
