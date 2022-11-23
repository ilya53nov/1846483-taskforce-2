import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskUserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
