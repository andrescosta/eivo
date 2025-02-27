import { Module } from '@nestjs/common';
import { LocatairesService } from './locataires.service';
import { LocatairesController } from './locataires.controller';
import { LocataireProfile } from './locataire.profile';
import { locataireProviders } from './locataire.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocatairesController],
  providers: [...locataireProviders, LocatairesService, LocataireProfile],
})
export class LocatairesModule {}
