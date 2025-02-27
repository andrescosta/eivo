import { Module } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { DomainesController } from './domaines.controller';
import { DomaineProfile } from './domaine.profile';
import { domaineProviders } from './domaine.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DomainesController],
  providers: [...domaineProviders, DomainesService, DomaineProfile],
})
export class DomainesModule {}
