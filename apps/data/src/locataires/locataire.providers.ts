import { DataSource } from 'typeorm';
import { Locataire } from '../entities/locataire.entity';

export const locataireProviders = [
    {
        provide: 'LOCATAIRE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Locataire),
        inject: ['DATA_SOURCE'],
    },
];
