import { Module } from '@nestjs/common';
import { HistoriquesService } from './historiques.service';
import { HistoriquesController } from './historiques.controller';
import { HistoriqueProfile } from './historique.profile';
import { historiqueProviders } from './historique.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoriquesController],
  providers: [...historiqueProviders, HistoriquesService, HistoriqueProfile],
})
export class HistoriquesModule {}
