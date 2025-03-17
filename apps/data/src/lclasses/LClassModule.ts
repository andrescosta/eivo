import { Module } from '@nestjs/common';
import { LClassService } from './LClassService';
import { LClassController } from './LClassController';
import { LClassProfile } from './LClassProfile';
import { lclassProvider } from './LClassProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LClassController],
  providers: [...lclassProvider, LClassService, LClassProfile],
})
export class LClassModule {}
