import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { UtilisateurProfile } from './utilisateur.profile';
import { utilisateurProviders } from './utilisateur.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UtilisateursController],
  imports: [DatabaseModule],
  providers: [...utilisateurProviders, UtilisateursService, UtilisateurProfile],
})
export class UtilisateursModule {}
