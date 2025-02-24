import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { UtilisateurProfile } from './utilisateur.profile';

@Module({
  controllers: [UtilisateursController],
  providers: [UtilisateursService, UtilisateurProfile],
})
export class UtilisateursModule {}
