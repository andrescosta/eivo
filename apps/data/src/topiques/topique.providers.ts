import { DataSource } from 'typeorm';
import { Topique } from '../entities/topique.entity';

export const topiqueProviders = [
    {
        provide: 'TOPIQUE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Topique),
        inject: ['DATA_SOURCE'],
    },
];
