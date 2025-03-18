import { DataSource } from 'typeorm';
import { Domain } from '../entities/Domain.entity';

export const domainProvider = [
    {
        provide: 'DOMAIN_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Domain),
        inject: ['DATA_SOURCE'],
    },
];
