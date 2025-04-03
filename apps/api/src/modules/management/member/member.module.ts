import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberProfile } from './member.profile';
import { memberProvider } from './member.provider';
import { DatabaseModule } from '../../common/database/database.module';


@Module({
  controllers: [MemberController],
  imports: [DatabaseModule],
  providers: [...memberProvider,MemberService, MemberProfile],
})
export class MemberModule {}
