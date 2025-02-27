import { DataSource } from 'typeorm';
import { Historique } from '../entities/historique.entity';

export const historiqueProviders = [
    {
        provide: 'HISTORIQUE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Historique),
        inject: ['DATA_SOURCE'],
    },
];
