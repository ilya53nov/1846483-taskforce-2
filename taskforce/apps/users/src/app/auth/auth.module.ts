import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TaskUserModule } from '../task-user/task-user.module';
import { TaskUserService } from '../task-user/task-user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TaskUserService],
  imports: [TaskUserModule]
})
export class AuthModule {}
