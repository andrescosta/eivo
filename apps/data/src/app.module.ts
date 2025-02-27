import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locataire } from './entities/locataire.entity';
import { Utilisateur } from './entities/utilisateur.entity';
import { Domaine } from './entities/domain.entity';
import { Classe } from './entities/classe.entity';
import { Membre } from './entities/membre.entity';
import { Historique } from './entities/historique.entity';
import { Activite } from './entities/activite.entity';
import { Topique } from './entities/topique.entity';
import { Application } from './entities/application.entity';
import { Jeu } from './entities/jeu.entity';


@Module({
  imports: [
    UtilisateursModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'lingv',
    //   entities: [
    //     Locataire,
    //     Utilisateur,
    //     Domaine,
    //     Classe,
    //     Membre,
    //     Historique,
    //     Activite,
    //     Topique,
    //     Application,
    //     Jeu,
    //   ],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
