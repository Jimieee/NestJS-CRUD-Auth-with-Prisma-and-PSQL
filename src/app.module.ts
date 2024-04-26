import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TaskModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
