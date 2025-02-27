import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriquesService } from './historiques.service';
import { HistoriquesController } from './historiques.controller';
import { Historique } from '../entities/historique.entity';
import { HistoriqueProfile } from './historique.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Historique])],
  controllers: [HistoriquesController],
  providers: [HistoriquesService, HistoriqueProfile],
})
export class HistoriquesModule {}
