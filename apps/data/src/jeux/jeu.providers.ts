import { DataSource } from 'typeorm';
import { Jeu } from '../entities/jeu.entity';

export const jeuProviders = [
    {
        provide: 'JEU_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Jeu),
        inject: ['DATA_SOURCE'],
    },
];
