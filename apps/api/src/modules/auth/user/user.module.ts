import { Module } from '@nestjs/common';
import { UserService } from '../../auth/user/user.service';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';
import { userProvider } from './user.provider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [...userProvider, UserService, UserProfile],
})
export class UserModule {}
