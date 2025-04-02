import { Module } from '@nestjs/common';
import { MemberService } from './MemberService';
import { MemberController } from './MemberController';
import { MemberProfile } from './MemberProfile';
import { memberProvider } from './MemberProvider';
import { DatabaseModule } from '../../common/database/database.module';


@Module({
  controllers: [MemberController],
  imports: [DatabaseModule],
  providers: [...memberProvider,MemberService, MemberProfile],
})
export class MemberModule {}
