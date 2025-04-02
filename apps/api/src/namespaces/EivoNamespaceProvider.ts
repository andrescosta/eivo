import { DataSource } from 'typeorm';
import { EivoNamespace } from '../entities/EivoNamespace.entity';

export const eivoNamespaceProvider = [
    {
        provide: 'NAMESPACE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EivoNamespace),
        inject: ['DATA_SOURCE'],
    },
];
