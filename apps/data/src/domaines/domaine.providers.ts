import { DataSource } from 'typeorm';
import { Domaine } from '../entities/domain.entity';

export const domaineProviders = [
    {
        provide: 'DOMAINE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Domaine),
        inject: ['DATA_SOURCE'],
    },
];
