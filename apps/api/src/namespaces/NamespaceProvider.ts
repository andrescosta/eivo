import { DataSource } from 'typeorm';
import { Namespace } from '../entities/Namespace.entity';

export const namespaceProvider = [
    {
        provide: 'NAMESPACE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Namespace),
        inject: ['DATA_SOURCE'],
    },
];
