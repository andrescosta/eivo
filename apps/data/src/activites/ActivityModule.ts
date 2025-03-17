import { Module } from '@nestjs/common';
import { ActivityService } from './ActivityService';
import { ActivityController } from './ActivityController';
import { activityProvider } from './ActivityProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityController],
  providers: [
    ...activityProvider,
    ActivityService
  ],
})
export class ActivityModule {}
