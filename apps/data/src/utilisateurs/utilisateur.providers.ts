import { DataSource } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';

export const utilisateurProviders = [
    {
      provide: 'UTILISATEUR_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Utilisateur),
      inject: ['DATA_SOURCE'],
    },
  ];

