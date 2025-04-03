import { DataSource } from 'typeorm';
import { EivoNamespace } from '../entity/eivo-namespace.entity';

export const eivoNamespaceProvider = [
    {
        provide: 'NAMESPACE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EivoNamespace),
        inject: ['DATA_SOURCE'],
    },
];
