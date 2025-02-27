import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainesService } from './domaines.service';
import { DomainesController } from './domaines.controller';
import { DomaineProfile } from './domaine.profile';
import { Domaine } from '../entities/domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Domaine])],
  controllers: [DomainesController],
  providers: [DomainesService, DomaineProfile],
})
export class DomainesModule {}
