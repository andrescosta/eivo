import { DataSource } from 'typeorm';
import { Tenant } from '../entities/Tenant';

export const tenantProvider = [
    {
        provide: 'LOCATAIRE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tenant),
        inject: ['DATA_SOURCE'],
    },
];
