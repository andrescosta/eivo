import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationProfile } from './application.profile';
import { applicationProviders } from './application.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationsController],
  providers: [...applicationProviders, ApplicationsService, ApplicationProfile],
})
export class ApplicationsModule {}
