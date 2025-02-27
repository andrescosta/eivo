import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { ActiviteProfile } from './activite.profile';
import { Activite } from '../entities/activite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activite])],
  controllers: [ActivitesController],
  providers: [ActivitesService, ActiviteProfile],
})
export class ActivitesModule {}
