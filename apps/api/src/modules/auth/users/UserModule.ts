import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './UserController';
import { UserProfile } from './UserProfile';
import { userProvider } from './UserProvider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [...userProvider, UserService, UserProfile],
})
export class UserModule {}
