import { Module } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { activiteProviders } from './activite.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivitesController],
  providers: [
    ...activiteProviders,
    ActivitesService
  ],
})
export class ActivitesModule {}
