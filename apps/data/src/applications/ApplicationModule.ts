import { Module } from '@nestjs/common';
import { ApplicationService } from './ApplicationService';
import { ApplicationController } from './ApplicationController';
import { ApplicationProfile } from './ApplicationProfile';
import { applicationProvider } from './ApplicationProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [...applicationProvider, ApplicationService, ApplicationProfile],
  exports: [...applicationProvider, ApplicationService, ApplicationProfile],
})
export class ApplicationModule {}
