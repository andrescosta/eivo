import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { activityProvider } from './activity.provider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityController],
  providers: [
    ...activityProvider,
    ActivityService
  ],
})
export class ActivityModule {}
