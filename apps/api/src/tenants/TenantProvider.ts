import { DataSource } from 'typeorm';
import { Tenant } from '../entities/Tenant.entity';

export const tenantProvider = [
    {
        provide: 'TENANT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tenant),
        inject: ['DATA_SOURCE'],
    },
];
