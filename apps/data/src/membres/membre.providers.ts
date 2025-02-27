import { DataSource } from 'typeorm';
import { Membre } from '../entities/membre.entity';

export const membreProviders = [
    {
        provide: 'MEMBRE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Membre),
        inject: ['DATA_SOURCE'],
    },
];
